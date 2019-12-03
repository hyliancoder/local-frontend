import React from 'react';
import PropTypes from 'prop-types';
import { generatePath, withRouter, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { Spacing } from 'components/Layout';
import Navigation from './Navigation';
import Avatar from 'components/Avatar';

import {
  SIDEBAR_DESKTOP_WIDTH,
  SIDEBAR_MOBILE_WIDTH,
  HEADER_HEIGHT,
} from 'constants/Layout';

import { useStore } from 'store';

import * as Routes from 'routes';

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding-top: ${HEADER_HEIGHT + 40}px;
  height: 100%;
  width: ${SIDEBAR_MOBILE_WIDTH}px;
  transition: margin-left 0.2s ease-in-out;
  font-size: ${p => p.theme.font.size.xxs};
  z-index: ${p => p.theme.zIndex.sm};
  background-color: ${p => p.theme.colors.white};
  box-shadow: ${p => p.theme.shadows.sm};

  @media (min-width: ${p => p.theme.screen.md}) {
    padding-top: 0;
    position: sticky;
    top: 100px;
    margin-left: ${p => (p.isOpen ? 0 : `-${SIDEBAR_DESKTOP_WIDTH}px`)};
    flex-basis: ${SIDEBAR_DESKTOP_WIDTH}px;
    flex-grow: 0;
    flex-shrink: 0;
    box-shadow: none;
    background-color: transparent;
  }

  @media (max-width: ${p => p.theme.screen.md}) {
    margin-left: ${p => (p.isOpen ? 0 : `-${SIDEBAR_MOBILE_WIDTH}px`)};
  }
`;

const User = styled(NavLink)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${p => p.theme.spacing.xs};
  border: 1px solid transparent;

  &:hover,
  &.selected {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid ${p => p.theme.colors.grey[300]};
  }
`;

const Name = styled.div`
  font-weight: ${p => p.theme.font.weight.bold};
  color: ${p =>
    p.active ? p.theme.colors.primary.main : p.theme.colors.text.primary};
`;

/**
 * Displays left side bar
 */
const SideBar = ({ location, isOpen, sideBarRef }) => {
  const [{ auth }] = useStore();

  const isAuthUsersProfilePage =
    auth.user.username === location.pathname.substring(1);

  return (
    <Root isOpen={isOpen} ref={sideBarRef}>
      <User
        exact
        to={generatePath(Routes.USER_PROFILE, {
          username: auth.user.username,
        })}
        activeClassName='selected'
      >
        <Avatar image={auth.user.image} size={20} />

        <Spacing left='xxs'>
          <Name active={isAuthUsersProfilePage}>
            {auth.user.firstName} {auth.user.lastName}
          </Name>
        </Spacing>
      </User>

      <Spacing top='sm' />

      <Navigation />
    </Root>
  );
};

SideBar.propTypes = {
  location: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default withRouter(SideBar);
