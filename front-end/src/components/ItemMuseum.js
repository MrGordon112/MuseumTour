import './ItemMuseum.css';

import React, { useContext,useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
const ItemMuseum = ({museum})  => {


    let [museumLink,setMuseumLink] = useState("./images/museum.jpg")
    let getMuseumPhoto = () => {
    if(museum?.type=="war" ){
        setMuseumLink("./images/war_museum.jpg")}
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
