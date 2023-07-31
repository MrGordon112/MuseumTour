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
import QRCode from "qrcode.react";

export default function UploadPhoto({match}) {

const [imageUpload, setImageUpload] = useState(null);
const [imageList, setImageList]=useState([]);

const imageListRef = ref(storage, 'images/')

const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageUpload(file);
  };
   const handleSubmit=()=> {
        if(imageUpload==null) return;
        const imageRef=ref(storage, 'images/'+v4())
        uploadBytes(imageRef,imageUpload).then((snapshot)=>{
        getDownloadURL(snapshot.ref).then((url)=>{
        setImageList((prev)=>[...prev, url]);
        })
        })
	    }

useEffect(()=>
{
listAll(imageListRef).then((response)=>{
response.items.forEach((item)=>{
getDownloadURL(item).then((url)=>{
setImageList((prev)=>[...prev, url]);
});
});
});

},[])

const downloadQR = () => {
  const canvas = document.getElementById("123456");
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  let downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = "alfa.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

  return (
<div>
  <form onSubmit={handleSubmit}>
  <label>Take a photo of the exponate and upload it here:</label>
  <input type="file"  required onChange={handleFileChange} required/>
  {imageUpload && (
        <img
          src={URL.createObjectURL(imageUpload)}
          alt="Preview"
          style={{ maxWidth: '300px', maxHeight: '300px' }}
        />
      )}
      <input type="submit"/>
     </form>



<p>scan my qr code</p>
<div>
<QRCode
    id="123456"
    value="www.google.com"
    size={290}
    level={"H"}
    includeMargin={true}
  />
<button onClick={downloadQR}> Download QR </button>
</div>
     </div>
				);
}
