import React from 'react';
import {useContext, useState, useEffect} from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
import ItemMuseum from '../components/ItemMuseum'
import Footer2 from '../components/Footer2'
import HeaderMuseums from '../components/HeaderMuseums'
export default function Museums() {

let [museums,setMuseums] = useState([])
const [loading, setLoading] = useState(false)
let {profile,user}=useContext(AuthContext)


  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const updateSearchResults = (searchTerm) => {
    const filteredResults = museums.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

   const handleChange = (e) => {
    setSearchTerm(e.target.value);
    // Call the search function here to update searchResults
    updateSearchResults(e.target.value);
  };


 useEffect(() => {

            setLoading(true);
           fetch('/museums/list_museums/') // Updated API endpoint with pagination parameters
            .then((response) => response.json())
            .then((data) => {
            setMuseums(data);
        setLoading(false);
            });


	    }, [])


  return (<div>

  <HeaderMuseums/>
<div className="body_list">
<form class="search" action="">
  <input type="search" placeholder="Search here..."
    defaultValue={searchTerm}
    onChange={handleChange}
   required/>


</form>

   {searchTerm && searchResults.map((museum, index) =>(<ItemMuseum   key={index} museum={museum} />))}
  {!searchTerm && museums.map((museum, index) =>(<ItemMuseum   key={index} museum={museum} />))  }

</div>
<Footer2/>

				</div>
				);
}
