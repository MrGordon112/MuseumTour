import React from 'react';
import {useContext, useState, useEffect} from 'react'
import '../App.css';
import axios from 'axios';
import  {
  useParams
} from 'react-router-dom'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
import { useNavigate } from "react-router-dom";
import {storage} from '../firebase'
import {ref,uploadBytes,listAll,getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'

export default function AddPost({match}) {

let [posts,setPosts] = useState([])
const [loading, setLoading] = useState(false)
let {profile,user}=useContext(AuthContext)

const { id } = useParams();
    let museumId = id

const [imageUpload, setImageUpload] = useState(null);
const imageListRef = ref(storage, 'images/')

const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageUpload(file);

  };

  const [inputs, setInputs] = useState({
    name:"",
    author:"",
    description:"",
    museum:museumId,
    urlImage:"",
    isUploaded:0,
  });

    let navigate = useNavigate();

 useEffect(() => {
 console.log({inputs})
 },[inputs])

 useEffect(()=>{
  if(imageUpload==null) return;
        const imageRef=ref(storage, 'images/'+v4())
        uploadBytes(imageRef,imageUpload).then((snapshot)=>{
        getDownloadURL(snapshot.ref).then((url)=>{
        setInputs({...inputs, urlImage: url})
        })
        })

 },[imageUpload])

   const handleSubmit=()=> {

        axios.post('http://127.0.0.1:8000/museums/museums_posts/'+museumId,inputs) // Updated API endpoint with pagination parameters
        navigate('/museums/'+museumId);
	    }


  return (
<div className="body-form">
  <div className="form-add">
  <form onSubmit={handleSubmit}>
  <label>Take a photo of the exponate and upload it here:</label>
  <input type="file"  onChange={handleFileChange} required/>
  {imageUpload && (
        <img
          src={inputs.urlImage}
          alt="Preview"
          style={{ maxWidth: '300px', maxHeight: '300px' }}
        />
      )}
      <label>Enter exponate name:
      <input required
        type="text"
        name="name"
        onChange={(event) => setInputs({...inputs, name: event.target.value})}
      />
        </label>
        <label>Enter the creator/author:
      <input required
        type="text"
        name="author"
         onChange={(event) => setInputs({...inputs, author: event.target.value})}
      />
      </label>
      <label>Details:  no restrictions

         <textarea type="text" id="subject" required
         name="description" placeholder="Write something.."
          onChange={(event) => setInputs({...inputs, description: event.target.value})}
          />
        </label>
        <button type="submit" className="add_button">add</button>

    </form>
				</div></div>
				);
}
