import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { Link } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';

import { useNavigate } from "react-router-dom";

function HeroSection() {
 let navigate = useNavigate();
  const routeChange = () =>{
    let path = `/museums`;
    navigate(path);
  }

  return (
    <div className='hero-container'>
      <video className="videoHero" src='https://firebasestorage.googleapis.com/v0/b/museum-ee649.appspot.com/o/videos%2Fvideo-1.mp4?alt=media&token=c2c564ad-7566-4dbe-8e81-2cf11f22e6fc' autoPlay loop muted />
      <h1>About us</h1>
       <p className="website-description"> &nbsp;&nbsp; &nbsp; Join us on this extraordinary journey as we revolutionize
      the way we experience museums. Embark on a virtual adventure, delve into the depths of knowledge,
       and let the treasures of the world's museums unfold before your eyes.</p>

      <div className='hero-btns'>
<Link to='/museums' className='btn-mobile'>
        <Button

          buttonStyle='btn--outline'
          buttonSize='btn--large'

        >
          List of museums
        </Button>
</Link>
 <LinkScroll to="FOOTER" smooth={true} duration={500}>
        <Button
          buttonStyle='btn--primary'
          buttonSize='btn--large'

        >
          Get your own exposition
        </Button>

        </LinkScroll>
      </div>
    </div>
  );
}

export default HeroSection;
