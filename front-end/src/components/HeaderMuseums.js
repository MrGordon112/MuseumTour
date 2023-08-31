import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { Link } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';

import { useNavigate } from "react-router-dom";

function HeaderMuseums() {
 let navigate = useNavigate();
  const routeChange = () =>{
    let path = `/museums`;
    navigate(path);
  }

  return (
    <div className='hero-container3'>
      <video className="videoHero" src='https://firebasestorage.googleapis.com/v0/b/museum-ee649.appspot.com/o/videos%2Fyt5s.io-Van%20Gogh%20Museum%204K%20Virtual%20Tour%20_%20Compilation-(1080p)%20(1)%20(online-video-cutter.com).mp4?alt=media&token=1849abe3-fa2f-42d0-add5-382a4e37756b' autoPlay loop muted playsInline />
      <h1>Our Museums</h1>
       <p className="website-description"> &nbsp;&nbsp; &nbsp; Here is a list of museums that
       already started to use our platform for their exponates, get lost in this online library.</p>


      <div className='hero-btns'>


      </div>
    </div>
  );
}

export default HeaderMuseums;
