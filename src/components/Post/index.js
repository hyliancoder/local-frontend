import React, { useState } from 'react';
import PostControlButton from '../Common/PostControlButton';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import PostContent from './PostContent';
import Comments from 'components/Comments/Comments';
import AddComment from 'components/Comments/AddComment';
import { useStore } from 'store/index';
import { Query } from 'react-apollo';
import { GET_FOLLOWED_POSTS } from 'graphql/post';

export default function Post(props) {
  const [{ auth }] = useStore();
  const [isCommentOpen, setCommentOpen] = useState(true);
  const toggle = () => setCommentOpen(!isCommentOpen);

  const articleClass = props.newPost ? 'hentry post' : 'hentry post video';

  const variables = {
    userId: auth.user.id,
    skip: 0,
    limit: 15,
  };

  return (
    <Query query={GET_FOLLOWED_POSTS} variables={variables}>
      {({ data, loading }) => {
        return loading === true ? (
          <h1>loading...!</h1>
        ) : (
          data.getFollowedPosts.posts.map(post => {
            return (
              <div key={post.id} className='ui-block'>
                <article className={articleClass}>
                  <PostHeader
                    author={post.author}
                    image={post.image}
                    createdAt={post.createdAt}
                    user={auth.user}
                    postId={post.id}
                  />
                  {/* {props.newPost ? <NewPost content={props.content} /> : <PostVideo tag={props.tag} body={props.body} />} */}
                  <PostContent content={post.content} image={post.image} newContent={props.newContent}/>
                  <PostFooter
                    toggle={toggle}
                    comments={post.comments}
                    author={post.author}
                    postId={post.id}
                    likes={post.likes}
                  />
                  <PostControlButton
                    toggle={toggle}
                    author={post.author}
                    postId={post.id}
                    likes={post.likes}
                  />
                </article>
                {isCommentOpen && (
                  <AddComment
                    authorId={auth.user.id}
                    author={auth.user}
                    postId={post.id}
                    onCancel={toggle}
                  />
                )}

                <Comments comments={post.comments} />
              </div>
            );
          })
        );
      }}
    </Query>
  );
}
