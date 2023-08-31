import './MyProfile.css';

import React, { useContext,useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import  {
  useParams
} from 'react-router-dom'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'

export default function MyProfile() {

let navigate=useNavigate()
    let {refreshUser,profile,logoutUser,user}=useContext(AuthContext)
    const Delete = async () => {
		var result = window.confirm("Want to delete?");
        if (result) {
    //Logic to delete the item

        fetch('/museums/profile/'+user?.user_id,{method:"DELETE"})
        .then((response)=>{
         logoutUser();
            navigate('/');
            if(!response.ok){
                throw new Error('not deleted')
            }

        }
        ).catch((e)=>{console.log(e)});
    }}
useEffect(() => {
    refreshUser()
  }, []);
  return (
  <div className='myProfile'>
    <div className="card-container">
        <span className="pro">Profile</span>
        <img className="round img_profile" src={profile?.urlImage} alt="user" />
        <h3>First Name:{profile?.first_name}</h3>
        <h3>Last Name:{profile?.last_name}</h3>
        <h6>Gender:{profile?.gender}</h6>
        <h6>Birthday:{profile?.birthday}</h6>
        <h6>Email:{profile?.user.email}</h6>
        <h6>UserName:{profile?.user.username}</h6>
        <h1><Link to='/myProfileEdit'  >
        <button className="primary">Edit</button>
           <br/>
           <br/>
        </Link>
        <button className="delete" className="primary" onClick={Delete}>&#x2716;Delete Account </button></h1>
    </div>
  </div>
  );
}
