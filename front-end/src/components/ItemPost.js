import './ItemPost.css';

import React, { useContext,useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const ItemPost = ({post})  => {
let [museumLink,setMuseumLink] = useState("./images/museum.jpg")
	return (
	<div className="center-post">

       <Link to={'/posts/'+post?.id} >
        <div class = "card">
    <img src={post?.urlImage} alt=""/>
    <div class="card-content">
      <h2>
        {post?.name}
      </h2>
      <p>
        <h3>{post?.author}</h3>
        <br/>
       {post?.description.slice(0, 60)}{post?.description.length > 30 ? '...' : ''}
      </p>
    </div>
    </div></Link>
</div>
		)
};

export default ItemPost
