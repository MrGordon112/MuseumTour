import React from 'react';
import {useContext, useState, useEffect} from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
import ItemMuseum from '../components/ItemMuseum'
import Footer2 from '../components/Footer2'
import HeaderAdministrator from '../components/HeaderAdministrator'
export default function MyMuseums() {

let [museums,setMuseums] = useState([])
const [loading, setLoading] = useState(false)
let {profile,user}=useContext(AuthContext)

 useEffect(() => {

            setLoading(true);
           fetch('/museums/list_my_museums/'+profile?.id) // Updated API endpoint with pagination parameters
            .then((response) => response.json())
            .then((data) => {
            setMuseums(data);
        setLoading(false);
            });


	    }, [])


  return (<div>
<HeaderAdministrator/>

<Link to='/addMuseum' ><button className="add_button" >+ add museum</button></Link>

<div>
  {museums.map((museum, index) =>(<ItemMuseum   key={index} museum={museum} />))  }


</div>
<Footer2/>
				</div>
				);
}
