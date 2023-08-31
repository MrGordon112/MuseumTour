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

const EditPost = ({match}) => {
const { id } = useParams();
let PostId = id

let [post,setPost] = useState([])

 useEffect(()=>{
        getPost()
    }, [PostId] )

 const [inputs, setInputs] = useState({
    name:"",
    author:"",
    description:"",
    urlImage:"",
  });

const [loading, setLoading] = useState(false)
let {profile,user}=useContext(AuthContext)


 let getPost = async()=>{
         let response =await fetch('/museums/post_detail/'+PostId)
        let data = await response.json()
        setPost(data)
        }
useEffect(() => {
    // Update the inputs state whenever the post state changes
    setInputs({
      name: post?.name || "",
      author: post?.author || "",
      description: post?.description || "",
      urlImage: post?.urlImage,
    });
  }, [post]);

const [imageUpload, setImageUpload] = useState(null);
const imageListRef = ref(storage, 'images/')

const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageUpload(file);

  };



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

        axios.put('/museums/post_detail/'+PostId,inputs) // Updated API endpoint with pagination parameters
        navigate('/posts/'+PostId);
	    }


  return (
<div className="body-form">
  <div className="form-add">
    <form onSubmit={handleSubmit}>
        <label>Take a photo of the exponate and upload it here:{PostId}</label>
        <input type="file"  onChange={handleFileChange} />
        {!imageUpload && (
            <img
            src={post?.urlImage}
            alt="Preview"
            style={{ maxWidth: '300px', maxHeight: '300px' }}
            />
        )}

        {imageUpload && (
            <img
            src={inputs?.urlImage}
            alt="Preview"
            style={{ maxWidth: '300px', maxHeight: '300px' }}
            />
        )}
        <label>Enter exponate name :
        <input required
            defaultValue={post?.name}
            type="text"
            name="name"
            onChange={(event) => setInputs({...inputs, name: event.target.value})}
        />
        </label>
        <label>Enter the creator/author :
        <input required
            defaultValue={post?.author}
            type="text"
            name="author"
            onChange={(event) => setInputs({...inputs, author: event.target.value})}
        />
        </label>
        <label>Details:  no restrictions
            <textarea type="text" id="subject" required
                defaultValue={post?.description}
                name="description" placeholder="Write something.."
                onChange={(event) => setInputs({...inputs, description: event.target.value})}
            />
        </label>
        <button type="submit" className="edit_button">&#x270E;Edit Post</button>
    </form>
  </div>
</div>
				);
}
export default EditPost