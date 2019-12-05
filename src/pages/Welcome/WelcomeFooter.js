import React from 'react';
import { Link } from 'react-router-dom';
const WelcomeFooter = () => {
  return (
    <div className='container'>
      <div className='row mb-5 mt-4 mt-xl-0'>
        <div className='col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 m-auto'>
          <div className='row'>
            <div className='col-6'>
              <h5 className='mb-1'>Avocado Nation © 2019</h5>
              <span>English (US)</span>
            </div>
            <div className='col-6 text-right'>
              <img src='img/avocado-primary-logo.png' alt='' />
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 m-auto'>
          <div className='ui-block-menu border-top pt-2'>
            <ul className='d-flex ftr-menu flex-wrap mb-5'>
              <li>
                <Link to=''>About</Link>
              </li>
              <li>
                <Link to=''>Privacy</Link>
              </li>
              <li>
                <Link to=''>Cookies</Link>
              </li>
              <li>
                <Link to=''>Terms</Link>
              </li>
              <li>
                <Link to=''>Account Security</Link>
              </li>
              <li>
                <Link to=''>Login Help</Link>
              </li>
              <li>
                <Link to=''>Help</Link>
              </li>
              <li>
                <Link to=''>Settings</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WelcomeFooter;