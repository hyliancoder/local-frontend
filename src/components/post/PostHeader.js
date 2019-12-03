import React from 'react';
// import PropTypes from 'prop-types'
import { withApollo } from 'react-apollo';
import Avatar from '../../components/Avatar.js';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { GET_FOLLOWED_POSTS, DELETE_POST } from '../../graphql/post';
import { GET_AUTH_USER } from '../../graphql/user';

<<<<<<< HEAD
const PostHeader = props => {
	const { author, postId, user, client } = props;
	let postDate = moment(1519129853500).format('YYYYMMDD');
	let isUserPost = () => !user.posts.find(x => x.id === postId);
	const deletePost = async () => {
		try {
			await client.mutate({
				mutation: DELETE_POST,
				variables: { input: { id: postId } },
				refetchQueries: () => [
					{
						query: GET_FOLLOWED_POSTS,
						variables: {
							userId: user.id,
							skip: 0,
						},
					},
					{
						query: GET_AUTH_USER,
						options: { fetchPolicy: 'cache-and-network' },
					},
				],
			});
		} catch (err) {}
	};
	return (
		<div className='post__author author vcard inline-items'>
			<Avatar image={author.image} size={40} />
			<div className='author-date'>
				<a className='h6 post__author-name fn' href='#1'>
					{`${author.firstName} ${author.lastName}`}
				</a>
				<div className='post__date'>
					<time className='published' dateTime='2004-07-24T18:18'>
						{moment(postDate, 'YYYYMMDD').fromNow()}
					</time>
				</div>
			</div>

			<div className='more'>
				<FontAwesomeIcon
					className='olymp-three-dots-icon'
					size='lg'
					color='black'
					icon={faEllipsisV}
					style={{ height: '8px' }}
				/>
				<ul className='more-dropdown'>
					{isUserPost() && (
						<li>
							<a href='#2'>Edit Post</a>
						</li>
					)}
					{isUserPost() && (
						<li>
							<a href='#2' onClick={e => deletePost(e)}>
								Delete Post
							</a>
						</li>
					)}
					<li>
						<a href='#2'>Turn Off Notifications</a>
					</li>
					<li>
						<a href='#2'>Select as Featured</a>
					</li>
				</ul>
			</div>
		</div>
	);
};
export default withApollo(PostHeader);
=======
import * as Routes from 'routes';

export default function PostHeader(props) {
  const { author, createdAt } = props;
  const rawTime = parseInt(createdAt);
  const postDate = new Date(rawTime);

  return (
    <div className='post__author author vcard inline-items'>
      <a
        href={generatePath(Routes.USER_PROFILE, {
          username: author.username,
        })}
      >
        <Avatar image={author.image} />
      </a>
      <div className='author-date'>
        <a
          className='h6 post__author-name fn'
          href={generatePath(Routes.USER_PROFILE, {
            username: author.username,
          })}
        >
          {author.firstName} {author.lastName}
        </a>
        <div className='post__date'>
          <time className='published' dateTime={postDate}>
            {moment(postDate, 'YYYYMMDDHHmms').fromNow()}
          </time>
        </div>
      </div>

      <div className='more'>
        <FontAwesomeIcon
          className='olymp-three-dots-icon'
          size='lg'
          color='black'
          icon={faEllipsisV}
          style={{ height: '12px' }}
        />
        <ul className='more-dropdown'>
          <li>
            <a href='#2'>Edit Post</a>
          </li>
          <li>
            <a href='#2'>Delete Post</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
>>>>>>> master
