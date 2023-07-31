import React from 'react';
import {useContext, useState, useEffect} from 'react'
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
import { useNavigate } from "react-router-dom";
import {storage} from '../firebase'
import {ref,uploadBytes,listAll,getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
export default function AddMuseum() {

let [museums,setMuseums] = useState([])
const [loading, setLoading] = useState(false)
let {profile,user}=useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState("");

const [imageUpload, setImageUpload] = useState(null);
const imageListRef = ref(storage, 'images/')

  const [inputs, setInputs] = useState({
    name:"",
    type:"",
    location:"",
    country:"",
    city:"",
    description:"",
    profile:profile.id,
    urlImage:""
  });

const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageUpload(file);

  };

    let navigate = useNavigate();
 useEffect(() => {
 console.log({inputs})
 },[inputs])

   const handleSubmit=()=> {

           axios.post('/museums/list_museums/',inputs) // Updated API endpoint with pagination parameters

        navigate('/myMuseums');

	    }
useEffect(()=>{
  if(imageUpload==null) return;
        const imageRef=ref(storage, 'images/'+v4())
        uploadBytes(imageRef,imageUpload).then((snapshot)=>{
        getDownloadURL(snapshot.ref).then((url)=>{
        setInputs({...inputs, urlImage: url})
        })
        })

 },[imageUpload])

  return (
<div className="body-form">
  <div className="form-add">
  <form onSubmit={handleSubmit}>
   <label>Take a photo of the exponate and upload it here:</label>
  <input type="file"  required onChange={handleFileChange} required/>
  {imageUpload && (

        <img
          src={inputs.urlImage}
          alt="Preview"
          style={{ maxWidth: '300px', maxHeight: '300px' }}
        />
      )}
    <div class="input-data">
      <label>Enter museum name:</label>
      <div class="underline"></div>
      <input
        type="text"
        name="name"
        required
        onChange={(event) => setInputs({...inputs, name: event.target.value})}
      /></div>
        <label>Enter museum type: (art, history, war, biologic etc)
      <input
        type="text"
        name="type"
        required
         onChange={(event) => setInputs({...inputs, type: event.target.value})}
      />
      </label>
      <label>Enter museum's location:(str. and nr.)
      <input
        type="text"
        name="location"
        required
        onChange={(event) => setInputs({...inputs, location: event.target.value})}
      />

      </label>
      <label>Enter museum's origin country:(ex. Romania)
        <input
          type="text"
          name="country"
          required
           onChange={(event) => setInputs({...inputs, country: event.target.value})}
        />

        </label>
      <label>Enter museum's origin city:(ex. Bucharest)
        <input
          type="text"
          name="city"
          required
           onChange={(event) => setInputs({...inputs, city: event.target.value})}
        />
        </label>
         <div>

         <label>Details:  no restrictions
         <br/>

         <textarea  type="text" id="subject"
         required
         name="description" placeholder="Write something.."
          onChange={(event) => setInputs({...inputs, description: event.target.value})}
          />
        </label>
        </div>
        <button type="submit" className="add_button">add</button>
        {errorMessage && <div className="error"> {errorMessage} </div>}
    </form></div>
				</div>
				);
}
