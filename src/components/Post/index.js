import React, { useState } from 'react';
import PostControlButton from '../Common/PostControlButton';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
// import PostContent from './PostContent';
import Comments from 'components/Comments/Comments';
import AddComment from 'components/Comments/AddComment';
import { useStore } from 'store';
import { Query } from 'react-apollo';
export default function Post({ queryOptions, isAuth }) {
  const [{ auth }] = useStore();
  const [isCommentOpen, setCommentOpen] = useState(true);
  const toggle = () => setCommentOpen(!isCommentOpen);

  const articleClass = 'hentry post';
  return (
    <Query
      query={queryOptions.query}
      variables={queryOptions.variables}
      notifyOnNetworkStatusChange
    >
      {({ data, loading }) => {
        let postData =
          queryOptions.callback === 'getFollowedPosts'
            ? data.getFollowedPosts
            : data.getUserPosts;
        return postData === undefined ? (
          <h1>loading...!</h1>
        ) : (
          postData.posts.map(post => {
            return (
              <div key={post.id} className='ui-block'>
                <article className={articleClass}>
                  <PostHeader
                    author={post.author}
                    createdAt={post.createdAt}
                    postId={post.id}
                    isAuth={isAuth}
                  />
                  {/* {props.newPost ? <NewPost content={props.content} /> : <PostVideo tag={props.tag} body={props.body} />} */}
                  {/* <PostContent content={post.content} image={post.image} /> */}
                  <PostFooter
                    toggle={toggle}
                    comments={post.comments}
                    author={post.author}
                    postId={post.id}
                    likes={post.likes}
                    isAuth={isAuth}
                  />
                  <PostControlButton
                    toggle={toggle}
                    comments={post.comments}
                    author={post.author}
                    postId={post.id}
                    likes={post.likes}
                    isAuth={isAuth}
                  />
                </article>
                {isAuth && isCommentOpen && (
                  <AddComment
                    authorId={auth.user.id}
                    author={auth.user}
                    postId={post.id}
                    onCancel={toggle}
                  />
                )}
                {isAuth && <Comments comments={post.comments} />}
              </div>
            );
          })
        );
      }}
    </Query>
  );
}
