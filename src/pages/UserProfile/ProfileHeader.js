import React, { useState, useEffect } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import UploadProfileImage from './UploadProfileImage';
import UploadCoverImage from './UploadCoverImage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { GET_FOLLOWED_POSTS, GET_POSTS } from 'graphql/post';
import { GET_AUTH_USER } from 'graphql/user';
import { CREATE_FOLLOW, DELETE_FOLLOW } from 'graphql/follow';

import { useNotifications } from 'hooks/useNotifications';
import { NotificationType } from 'constants/NotificationType';

import * as Routes from 'routes';

const ProfileHeader = ({ user, refetch, auth, isOwner, isAdmin }) => {
  const [activeFollow, setActiveFollow] = useState(true);
  const [isProfileShowing, setProfileIsShowing] = useState(false);
  const [isCoverShowing, setCoverIsShowing] = useState(false);
  const [ImagesContent, setImagesContent] = useState({
    title: '',
    image: user.image,
    isCover: false,
    coverImage: user.coverImage,
  });
  let { title, image, isCover, coverImage } = ImagesContent;

  const notification = useNotifications();
  const hasFollow = user.followers.find(f => f.follower === auth.user.id);
  useEffect(() => {
    setActiveFollow(true);
  }, [auth.user.following]);

  const handleButtonClick = async mutate => {
    setActiveFollow(false);
    const { data } = await mutate();
    !hasFollow &&
      (await notification.toggle({
        user,
        hasDone: hasFollow,
        notificationType: NotificationType.FOLLOW,
        notificationTypeId: data.createFollow ? data.createFollow.id : null,
      }));
  };

  let toggleProfile = (title, isCover, image) => {
    setImagesContent({
      ...ImagesContent,
      title: title,
      isCover: isCover,
      image: image,
    });
    setProfileIsShowing(true);
  };
  let toggleCover = (title, isCover, coverImage) => {
    setImagesContent({
      ...ImagesContent,
      title: title,
      isCover: isCover,
      coverImage: coverImage,
    });
    setCoverIsShowing(true);
  };
  const operation = hasFollow ? 'delete' : 'create';
  const options = {
    create: {
      mutation: CREATE_FOLLOW,
      variables: { userId: user.id, followerId: auth.user.id },
    },
    delete: {
      mutation: DELETE_FOLLOW,
      variables: { id: hasFollow ? hasFollow.id : null },
    },
  };

  return (
    <Mutation
      mutation={options[operation].mutation}
      variables={{ input: { ...options[operation].variables } }}
      refetchQueries={() => [
        { query: GET_AUTH_USER },
        { query: GET_POSTS, variables: { authUserId: auth.user.id } },
        {
          query: GET_FOLLOWED_POSTS,
          variables: { userId: auth.user.id },
        },
      ]}
    >
      {mutate => {
        return (
          <div className='col-12'>
            <div className='ui-block'>
              <div className='top-header'>
                <div className='top-header-thumb'>
                  {user.coverImage ? (
                    <LazyLoadImage
                      src={user.coverImage}
                      alt='cover'
                      height={100}
                      width={100}
                    />
                  ) : (
                    <LazyLoadImage
                      src='https://res.cloudinary.com/hylian/image/upload/f_auto,q_auto/v1580838904/static/profile-bg_edozor-min_at2lpf.jpg'
                      alt='nature'
                      height={100}
                      width={100}
                    />
                  )}
                </div>
                <div className='top-header-author'>
                  <Link
                    className='author-thumb'
                    onClick={e => {
                      e.preventDefault();
                    }}
                  >
                    {user.image ? (
                      <LazyLoadImage src={user.image} alt='profile' />
                    ) : (
                      <LazyLoadImage
                        src='https://res.cloudinary.com/hylian/image/upload/f_auto,q_auto/v1576220262/static/Image_from_iOS_1_bnaxnc.jpg'
                        alt='nature'
                      />
                    )}
                  </Link>
                  <div className='author-content'>
                    <Link to={Routes.HOME} className='h4 author-name'>
                      {`${user.firstName} ${user.lastName}`}
                    </Link>
                    <div className='author-location'>{user.username}</div>
                    {!isOwner && (
                      <button
                        className={`${
                          hasFollow ? 'following-btn ' : ''
                        }btn btn-primary`}
                        onClick={
                          activeFollow ? () => handleButtonClick(mutate) : null
                        }
                      >
                        {hasFollow ? 'Following' : 'Follow +'}
                      </button>
                    )}
                    {isOwner || isAdmin ? (
                      <div className='settings-block-btn'>
                        {isAdmin && (
                          <div className='btn btn-control bg-primary more'>
                            <Link
                              to={generatePath(Routes.MESSAGES, {
                                userId: user.id,
                              })}
                            >
                              <FontAwesomeIcon
                                size='xl'
                                color='white'
                                icon={faEnvelope}
                                style={{ fontSize: '25px', height: '25px' }}
                              />
                            </Link>
                          </div>
                        )}
                        <div className='btn btn-control bg-primary more'>
                          <FontAwesomeIcon
                            size='xl'
                            color='white'
                            icon={faCog}
                            style={{ fontSize: '25px', height: '25px' }}
                          />
                          <ul className='more-dropdown more-with-triangle triangle-bottom-right'>
                            <li>
                              <Link
                                data-toggle='modal'
                                data-target='#update-header-photo'
                                onClick={e => {
                                  e.preventDefault();
                                  toggleProfile(
                                    'Edit Profile Photo',
                                    false,
                                    user.image
                                  );
                                }}
                              >
                                Update Profile Photo
                              </Link>
                            </li>
                            <li>
                              <Link
                                data-toggle='modal'
                                data-target='#update-header-photo'
                                onClick={e => {
                                  e.preventDefault();
                                  toggleCover(
                                    'Edit Cover Photo',
                                    true,
                                    user.coverImage
                                  );
                                }}
                              >
                                Update Cover Image
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className='profile-section'>
                  {isOwner || isAdmin ? (
                    <UploadProfileImage
                      show={isProfileShowing}
                      onHide={() => setProfileIsShowing(false)}
                      user={user}
                      isCover={isCover}
                      image={image}
                      title={title}
                      refetch={refetch}
                    />
                  ) : null}
                  {isOwner || isAdmin ? (
                    <UploadCoverImage
                      show={isCoverShowing}
                      onHide={() => setCoverIsShowing(false)}
                      user={user}
                      isCover={isCover}
                      coverImage={coverImage}
                      title={title}
                      refetch={refetch}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Mutation>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default ProfileHeader;
