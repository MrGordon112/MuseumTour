import './ItemMuseum.css';

import React, { useContext,useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
const ItemMuseum = ({museum})  => {


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
	return (
        <div>
       <Link to={'/museums/'+museum?.id} >
       <div class="center">
        <div class="article-card">
            <div class="content">
                <p class="date">Country:{museum?.country}   City:{museum?.city}</p>
                <p class="title">{museum?.name} </p>
                <p class="date">Type: {museum?.type}</p>
                 <p class="date">Administrator:{museum?.profile?.first_name} {museum?.profile?.last_name}</p>
            </div>
            <img src={museumLink} alt="article-cover" />
            </div>
            </div>
        </Link>
        </div>
		)
};

export default ItemMuseum
