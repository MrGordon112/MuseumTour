import {React, useState, useEffect} from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { Link } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';

import { useNavigate } from "react-router-dom";

function HeaderMuseumAdministrator({museum})   {
 let navigate = useNavigate();


  const routeChange = () =>{
    let path = `/museums`;
    navigate(path);
  }
 let [museumLink,setMuseumLink] = useState("./images/museum.jpg")

    let getMuseumPhoto = () => {
    if(museum?.type=="war")
        setMuseumLink("./images/war_museum.jpg")
    if(museum?.type=="science" || museum?.type=="biologic" || museum?.type=="history")
        setMuseumLink("./images/science_museum.jpg")
    if(museum?.type=="art")
        setMuseumLink("./images/art_museum.jpg")
    if(museum?.type=="guns")
        setMuseumLink("./images/guns_museum.jpg")
    if(museum?.type=="tanks")
        setMuseumLink("./images/tanks_museum.jpg")
    if(museum?.type=="plane")
        setMuseumLink("./images/planes_museum.jpg")
    if(museum?.type=="literature")
        setMuseumLink("./images/literature_museum.jpg")
    if(museum?.type=="van gogh")
        setMuseumLink("./images/van_gogh_museum.jpg")
    }

    useEffect(() => {
    getMuseumPhoto()
  }, [museum]);


  let src_url='http://maps.google.com/maps?q='+museum?.country+'+'+museum?.city+'+'+museum?.location+'&z=18&output=embed'


  return (
  <div>
    <div className='hero-container'>

      <h1>{museum?.name}</h1>
      <br/>
      <br/>
      <h2>Type of museum: {museum?.type}</h2>
      <h3>Country:{museum?.country} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  City:{museum?.city}</h3>
      <div className="museum_container"> <p className="website-description"> &nbsp;&nbsp; &nbsp; Contact:{museum?.description} .</p>
      <iframe src={src_url} className="map"   allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>

       <img src={museumLink}  className="image_carousel" alt="article-cover" />
</div>
</div>
  );
}

export default HeaderMuseumAdministrator;
