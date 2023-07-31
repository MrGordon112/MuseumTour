import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

import axios from 'axios';
import AuthContext from '../context/AuthContext'
import React,{useContext, useState,useEffect} from 'react'

function Footer() {

   let {profile,user}=useContext(AuthContext)

   let [request,setRequest]=useState({
    details: "",
    profile: profile?.id,
    name:profile?.firstName,
  });

let postRequest=async()=>
    {
         axios.post('/museums/requests/',request).then(()=>{setRequest({...request, details: ""})})


    }
  return (
    <div className='footer-container' id="FOOTER">
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Send a request if you want to open your own exposition on ower website.
        </p>
        <p className='footer-subscription-text'>
          The owner of the applicattion grant you the permision to add museums and posts with your exponates.
        </p>
        <div className='input-areas'>
          {profile && !profile.isAdministrator && <form onSubmit={postRequest}>

            <textarea

               className="textarea-comment"
          maxlength="100"
          name="details"
           value={request.details}
            onChange={(event) => setRequest({...request, details: event.target.value})}
          placeholder="Write why you want to use our platform..."
          required
        />
            <Button buttonStyle='btn--outline'>Send request</Button>
          </form>}
          {!profile&& <p className='footer-subscription-text'>
          First you need to <Link to={'/login'}> Login</Link> and complete your profile with data.
        </p>}
        </div>
      </section>

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

export default Footer;
