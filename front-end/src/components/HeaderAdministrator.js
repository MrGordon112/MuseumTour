import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { Link } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';

import { useNavigate } from "react-router-dom";

function HeaderAdministrator() {
 let navigate = useNavigate();
  const routeChange = () =>{
    let path = `/museums`;
    navigate(path);
  }

  return (
    <div className='hero-container3'>
       <img src="https://firebasestorage.googleapis.com/v0/b/museum-ee649.appspot.com/o/images%2Fmuseum.jpg?alt=media&token=35fc3081-77ae-49ff-ab83-0446912c0896"  className="image_carousel" alt="article-cover" />
      <h1>Administrator Page</h1>
       <div className="website-description"><p> &nbsp;&nbsp; &nbsp; Here you can add new museums or modify yours, also here you
       can add new exponates and download the generated qr codes .</p></div>

    </div>
  );
}

export default HeaderAdministrator;
