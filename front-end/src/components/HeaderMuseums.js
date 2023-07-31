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
      <video className="videoHero" src='https://firebasestorage.googleapis.com/v0/b/museum-ee649.appspot.com/o/videos%2Fyt5s.io-Van%20Gogh%20Museum%204K%20Virtual%20Tour%20__%20Compilation-(1080p).mp4?alt=media&token=c662a065-894a-4ed7-8395-ba8b5315bd4a' autoPlay loop muted />
      <h1>Our Museums</h1>
       <p className="website-description"> &nbsp;&nbsp; &nbsp; Here is a list of museums that
       already started to use our platform for their exponates, get lost in this online library.</p>


      <div className='hero-btns'>


      </div>
    </div>
  );
}

export default HeaderMuseums;
