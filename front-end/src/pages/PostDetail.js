import './PostDetail.css';
import React,{useContext, useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import  {
  useParams
} from 'react-router-dom'
import axios from 'axios';
import AuthContext from '../context/AuthContext'
import { v4 } from "uuid"

import { Link } from 'react-router-dom';
import QRCode from "qrcode.react";
import ModalImage from "react-modal-image";



import {storage} from '../firebase'
import {ref,uploadBytes,listAll,getDownloadURL} from 'firebase/storage'


const PostDetail = ({match})  => {

    let navigate = useNavigate();
    const { id } = useParams();
    let postId = id
    let {profile,user}=useContext(AuthContext)
    let [post,setPost] = useState()
    let [check,setCheck]=useState(0)



    let [comments,setComments]=useState([])
    let [comment,setComment]=useState({
    details: "",
    profile: profile?.id,
    post:postId,
    date: "we will see",
  });

    useEffect(()=>{
        getPost()
        getComments()

    }, [postId] )

    useEffect(()=>{
    getComments()
    },[])

    let getComments=async()=>{
    let response =await fetch('/museums/comments/'+postId)
        let data = await response.json()
        setComments(data)
    }
    let postComment=async()=>
    {
         axios.post('/museums/comments/'+postId,comment).then(()=>{setComment({...comment, details: ""})})


    }

     const DeleteComment = async (data) => {

    //Logic to delete the item

        fetch('/museums/comment/'+data,{method:"DELETE"})
        .then((response)=>{
            window.location.reload();
            if(!response.ok){

                throw new Error('not deleted')
            }}
        ).catch((e)=>{console.log(e)});
        }

    let getPost = async()=>{
         let response =await fetch('/museums/post_detail/'+postId)
        let data = await response.json()
        setPost(data)
        }


       const Delete = async () => {
		var result = window.confirm("Want to delete?");
        if (result) {
    //Logic to delete the item

        fetch('/museums/post_detail/'+postId,{method:"DELETE"})
        .then((response)=>{
            if(!response.ok){
                throw new Error('not deleted')
            }

            navigate('/museums/'+post.museum.id);
        }
        ).catch((e)=>{console.log(e)});
    }}

const downloadQR = () => {
  const canvas = document.getElementById(post?.id);
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");

  let downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = post?.name+"_"+post?.author+'.png';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

const uploadQr=()=>{
const canvas = document.getElementById(post?.id);
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
   if(!post.isUploaded){
    const updatedPost = {
      name:post.name,
    author:post.author,
    description:post.description,
    museum:post.museum.id,
    urlImage:post.urlImage,
    isUploaded:1,
    };
  fetch(pngUrl)
  .then((res) => res.blob())
  .then((blob) => {
    const imageRef = ref(storage, post.museum.name+"_"+post.museum.city+'/' + v4());
    // Upload the binary data to Firebase Storage
    uploadBytes(imageRef, blob)})
    axios.put('/museums/post_detail/'+post.id,updatedPost)
    setCheck(1)
    }

}

	return (<div className="body-post">
	<div class="container-post">
 <div class="wrapper-post">
   <div class="banner-image">
   <ModalImage className="post-img"
  small={post?.urlImage}
  large={post?.urlImage}
  alt="Hello World!"
/>

   </div>
   <h1 className="h1-post"> {post?.name}</h1>
   <h4 className="h2-post">{post?.author}</h4>
   <p className="p-post">Details:<br/>{post?.description} </p>
  </div>
  <div class="button-wrapper">

  </div>

 {profile?.id===post?.museum?.profile?.id && <div><button className="delete_button2" onClick={Delete}>Delete</button>
<div>
<QRCode
    id={post?.id}
    value={"blabla"+post?.id}
    size={200}
    level={"H"}
    includeMargin={true}
  />

<div><button className="add_button2" onClick={downloadQR}> Download QR</button>{!post.isUploaded&&!check&&<button className="add_button2" onClick={uploadQr}> Upload QR</button>}</div></div></div>}
<h2 class="comments-title" id="comments">
      <span>Comments</span>
    </h2>
<div className="all-comment-section">
<div className="comment-section">

       {comments.map((Comment, index) =>(<div>
       <figure class="snip1197 hover">
  <figcaption>
    <blockquote>{Comment?.details}</blockquote>
    <div class="arrow"></div>
  </figcaption>
  <img src={Comment?.profile?.urlImage} alt="sq-sample33"/>
  <div class="author">
    <h5>{Comment?.profile?.first_name} {Comment?.profile?.last_name} {profile?.id==Comment.profile.id&&<button className="delete-comment" onClick={() =>DeleteComment(Comment?.id)}>
delete </button> }  </h5>

  </div>
</figure>

<p></p></div>))  }</div>



 {profile && <form onSubmit={postComment} id="comment-form">

        <textarea
        className="textarea-comment"
          maxlength="100"
          name="details"
           value={comment.details}
            onChange={(event) => setComment({...comment, details: event.target.value})}
          placeholder="Write a comment..."
          required
        />
        <button type="submit" className="send-comment">Leave Comment</button>
      </form>}
{!profile && <h2  className="h2-Post" >
      <span>If you want to leave a comment please<Link to={'/login'}> Login</Link></span>
    </h2>}
    </div>
</div>

		</div>
		)
};

export default PostDetail