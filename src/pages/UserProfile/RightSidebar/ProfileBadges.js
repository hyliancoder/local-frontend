import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import * as Routes from 'routes';
export default function ProfileBadges() {
  return (
    <div className='ui-block'>
      <div className='ui-block-title topics'>
        <h6 className='title'>Badges</h6>
      </div>
      <div className='ui-block-content'>
        {/* <!-- W-Badges --> */}

        {/* <!-- W-Badges --> */}

        <ul className='widget w-badges'>
          <li>
            <Link to={Routes.BADGES}>
              <LazyLoadImage
                className='badge-img'
                src='https://res.cloudinary.com/hylian/image/upload/f_auto,q_auto/v1576788606/static/badge2_kmjarm.png'
                alt='author'
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
