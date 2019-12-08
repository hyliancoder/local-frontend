import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'components/Avatar';
import * as Routes from 'routes';

import {
  OlympMenu,
  RewardIcon,
  SettingIcon,
  LogOut,
  CheckIcon,
  DropDownArrowIcon,
} from 'components/icons';
const AuthorPage = ({ user }) => {
  return (
    <div className='author-page author vcard inline-items more'>
      <div className='author-thumb'>
        <Avatar image={user.image} />
        <span className='icon-status online'></span>
        <div className='more-dropdown more-with-triangle'>
          <div className='mCustomScrollbar' data-mcs-theme='dark'>
            <div className='ui-block-title ui-block-title-small'>
              <h6 className='title'>Your Account</h6>
            </div>
            <ul className='account-settings'>
              <li>
                <Link>
                  <OlympMenu className='olymp-camera-icon' />
                  <span>Edit Profile</span>
                </Link>
              </li>
              <li>
                <Link to={Routes.SETTING}>
                  <SettingIcon className='olymp-star-icon left-menu-icon' />

                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <Link>
                  <RewardIcon className='olymp-logout-icon' />
                  <span>Rewards</span>
                </Link>
              </li>
              <li>
                <a href='/login' onClick={() => localStorage.clear()}>
                  <LogOut className='olymp-logout-icon' />
                  <span>Log Out</span>
                </a>
              </li>
            </ul>
            <form className='form-group with-button custom-status'>
              <input
                className='form-control'
                placeholder=''
                type='text'
                defaultValue='Refer a Friend '
              />
              <button className='bg-purple'>
                <CheckIcon className='olymp-check-icon' />
              </button>
            </form>
            <ul>
              <li>
                <Link>
                  <span>Terms and Conditions</span>
                </Link>
              </li>
              <li>
                <Link>
                  <span>Idea Submission</span>
                </Link>
              </li>
              <li>
                <Link>
                  <span>Community Guidlines</span>
                </Link>
              </li>
              <li>
                <Link>
                  <span>FAQs</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Link className='author-name fn my-auto'>
        <div className='author-title author-title-custom'>
          {`${user.firstName} ${user.lastName}`}
          <DropDownArrowIcon className='olymp-dropdown-arrow-icon' />
        </div>
        <span className='author-subtitle author-subTitle-custom'>
          SPACE COWBOY
        </span>
      </Link>
    </div>
  );
};
export default AuthorPage;
