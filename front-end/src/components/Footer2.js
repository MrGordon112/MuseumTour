import React from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer2() {
  return (
    <div className='footer-container' >


      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              GRD
              <i className='fab fa-typo3' />
            </Link>
          </div>
          <small className='website-rights'>GRD © 2023</small>

        </div>
      </section>
    </div>
  );
}

export default Footer2;
