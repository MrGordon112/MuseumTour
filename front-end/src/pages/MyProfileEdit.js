import React, { useContext,useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import  {
  useParams
} from 'react-router-dom'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
import {storage} from '../firebase'
import {ref,uploadBytes,listAll,getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'

export default function MyProfileEdit() {

let navigate=useNavigate()
    let {refreshUser,profile,logoutUser,user}=useContext(AuthContext)

    const [inputs, setInputs] = useState({
    first_name: profile.first_name,
    last_name: profile.last_name,
    gender: profile.gender,
    birthday: profile.birthday,
    urlImage:"",
  });
const [imageUpload, setImageUpload] = useState(null);
const imageListRef = ref(storage, 'images/')


const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageUpload(file);
  };
useEffect(()=>{
  if(imageUpload==null) return;
        const imageRef=ref(storage, 'images/'+v4()+".jpg")
        uploadBytes(imageRef,imageUpload).then((snapshot)=>{
        getDownloadURL(snapshot.ref).then((url)=>{
        setInputs({...inputs, urlImage: url})
        })
        })

 },[imageUpload])
  const handleSubmit=()=> {
         axios.patch('http://127.0.0.1:8000/museums/profile/'+user?.user_id,inputs )
        .then((response)=>{
            if(!response.status==200){
                throw new Error('not added')

            }  }
        ).catch((e)=>{alert(e)});
        navigate('/myProfile')
    };

  useEffect(()=>{

    }, [imageUpload] )

  return (

<div className='myProfile'>
  <div className="card-container">
  <span className="pro">Profile</span>

<form onSubmit={handleSubmit}
    >
     <label><h6>Profile Photo</h6></label>
  <input type="file"  onChange={handleFileChange} />

  {imageUpload && (
  <img className="round img_profile" src={inputs?.urlImage} alt="user" />
      )}

      <label><h6>First</h6>
      <input
        defaultValue={profile?.first_name}
        type="text"
        name="first_name"
        onChange={(event) => setInputs({...inputs, first_name: event.target.value})}
      />
        </label>
        <label><h6>Second Name</h6>
      <input
       defaultValue={profile?.last_name}
        type="text"
        name="second_name"
         onChange={(event) => setInputs({...inputs, last_name: event.target.value})}
      />
      </label>
      <label><h6>Gender:</h6>
      <input
       defaultValue={profile?.gender}
        type="text"
        name="gender"
        onChange={(event) => setInputs({...inputs, gender: event.target.value})}
      />

      </label>
      <label><h6>Birthday</h6>
        <input
         defaultValue={inputs?.birthday}
          type="text"
          name="birthday"
           onChange={(event) => setInputs({...inputs, birthday: event.target.value})}
        />
        </label><br /> <br />
       <label> <button className="primary " type="submit">Done</button></label>
    </form>
  </div></div>
  );
}
