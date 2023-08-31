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
 let [museumLink,setMuseumLink] = useState("https://firebasestorage.googleapis.com/v0/b/museum-ee649.appspot.com/o/images%2Fmuseum.jpg?alt=media&token=35fc3081-77ae-49ff-ab83-0446912c0896")

     let getMuseumPhoto = () => {
    if(museum?.type=="war" ){
        setMuseumLink("https://firebasestorage.googleapis.com/v0/b/museum-ee649.appspot.com/o/images%2Fwar_museum.jpg?alt=media&token=8a0210cb-5c9a-4e8e-8515-0b35548e28ee")}
    if(museum?.type=="science" || museum?.type=="biologic" || museum?.type=="history")
        setMuseumLink("https://firebasestorage.googleapis.com/v0/b/museum-ee649.appspot.com/o/images%2Fscience_museum.jpg?alt=media&token=57368431-9ff1-4aec-92d2-1420947defe5")
    if(museum?.type=="art")
        setMuseumLink("https://firebasestorage.googleapis.com/v0/b/museum-ee649.appspot.com/o/images%2Fart_museum.jpg?alt=media&token=c53a3f77-bb93-4e47-95b8-8f08b94c4f31")
    if(museum?.type=="guns")
        setMuseumLink("https://firebasestorage.googleapis.com/v0/b/museum-ee649.appspot.com/o/images%2Fguns_museum.jpg?alt=media&token=8aa8f1d5-cc9f-4463-a25d-eef0ab9ac79a")
    if(museum?.type=="tanks")
        setMuseumLink("https://firebasestorage.googleapis.com/v0/b/museum-ee649.appspot.com/o/images%2Ftanks_museum.jpg?alt=media&token=d977e329-5e46-4359-a533-413f7445c16f")
    if(museum?.type=="plane")
        setMuseumLink("https://firebasestorage.googleapis.com/v0/b/museum-ee649.appspot.com/o/images%2Fplanes_museum.jpg?alt=media&token=a44c6a63-7fc1-469c-a5c7-631977af052f")
    if(museum?.type=="literature")
        setMuseumLink("https://firebasestorage.googleapis.com/v0/b/museum-ee649.appspot.com/o/images%2Fliterature_museum.jpg?alt=media&token=1bccfb33-a44e-4d36-ab09-fbc2212c7486")
    if(museum?.type=="van gogh")
        setMuseumLink("https://firebasestorage.googleapis.com/v0/b/museum-ee649.appspot.com/o/images%2Fvan_gogh_museum.jpg?alt=media&token=75a74c71-e759-431d-96db-0f39fab96fc7")
    }
    useEffect(() => {
    getMuseumPhoto()
  }, [museum]);


  let src_url='http://maps.google.com/maps?q='+museum?.country+'+'+museum?.city+'+'+museum?.location+'&z=18&output=embed'


  return (
  <div>
    <div className='hero-container  '>

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
