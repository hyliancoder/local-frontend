import React from 'react';

import InfiniteScroll from 'components/InfiniteScroll';
import SinglePost from './SinglePost'

import { Query } from 'react-apollo';

const Post = ({ queryOptions, isAuth }) => {
  let postData = null;
  let postsData = null;
  return (
    <Query
      query={queryOptions.query}
      variables={queryOptions.variables}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, fetchMore, networkStatus }) => {
        if (loading && networkStatus === 1) {
          return (
            <div className='d-flex justify-content-center my-2'>
              <img
                className='flex'
                src='https://res.cloudinary.com/weare270b/image/upload/v1579191490/static/loader_eyctc7.gif'
                alt='laoding .....'
              />
            </div>
          );
        }
        if (queryOptions.callback === 'getFollowedPosts') {
          postsData = data.getFollowedPosts;
        }
        if (queryOptions.callback === 'getUserPosts') {
          postsData = data.getUserPosts;
        }
        if (queryOptions.callback === 'getPost') {
          postData = data.getPost;
        }

        if (!postsData && !postData) {
          return null;
        }
        if (postsData) {
          return (
            <InfiniteScroll
              data={postsData.posts}
              dataKey={`${queryOptions.callback}.posts`}
              count={parseInt(postsData.count)}
              variables={queryOptions.variables}
              fetchMore={fetchMore}
            >
              {data => {
                const showNextLoading =
                  loading &&
                  networkStatus === 3 &&
                  parseInt(postsData.count) !== data.length;

                return (
                  <>
                    {data.map(post => {
                      return SinglePost(post, isAuth);
                    })}
                    {showNextLoading && (
                      <div className='d-flex justify-content-center my-2'>
                        <img
                          className='flex'
                          src='https://res.cloudinary.com/weare270b/image/upload/v1579191490/static/loader_eyctc7.gif'
                          alt='laoding .....'
                        />
                      </div>
                    )}
                  </>
                );
              }}
            </InfiniteScroll>
          );
        } else if (postData) {
          return SinglePost(postData, isAuth);
        }
      }}
    </Query>
  );
};

export default Post;
