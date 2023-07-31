import React,{useContext, useState,useEffect} from 'react'
import './MuseumDetail.css';
import { useNavigate } from "react-router-dom";
import  {
  useParams
} from 'react-router-dom'
import { GoogleMapReact } from 'google-maps-react';
import Footer2 from '../components/Footer2'

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {storage} from '../firebase'
import {ref,uploadBytes,listAll,getDownloadURL, getMetadata,getStorage} from 'firebase/storage'

import HeaderMuseumAdministrator from '../components/HeaderMuseumAdministrator'

import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'

import ItemPost from '../components/ItemPost'


const MuseumDetail = ({match})  => {

    const { id } = useParams();
    let museumId = id
    let [museum,setMuseum]=useState(null)
    let {profile,user}=useContext(AuthContext)
    let [posts,setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

  const updateSearchResults = (searchTerm) => {
    const filteredResults = posts.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);

    setSearchResults(null);
  };

   const handleChange = (e) => {
    setSearchTerm(e.target.value);
    // Call the search function here to update searchResults
    updateSearchResults(e.target.value);
  };

    useEffect(()=>{
        getMuseum()
        getPosts()
    }, [museumId] )


    let getMuseum = async()=>{
        let response =await fetch('/museums/list_museums/'+ museumId)
        let data = await response.json()
        setMuseum(data)
        }

    let getPosts = async()=>{
        let response =await fetch('/museums/museums_posts/'+ museumId)
        let data = await response.json()
        setPosts(data)
        }
    let navigate = useNavigate();






    const downloadQrCodes= async () => {
  const zip = new JSZip();
  const storage = getStorage();
  const folderRef = ref(
    storage,
    museum.name+"_"+museum.city+'/'
  );
  const folderItems = await listAll(folderRef);

await Promise.all(
      folderItems.items.map(async (item) => {
      const fileRef=ref(storage,museum.name+"_"+museum.city+'/'+item.name)
        const fileUrl=await getDownloadURL(fileRef);
        const response = await fetch(fileUrl);
        const itemBlob = await response.blob();
        console.log(fileUrl)

         // Download the file's data as a blob
        zip.file(item.name+".png", itemBlob ); // Add the file to the zip with its original name
      })
    );

    // Generate the zip content and create a Blob
    const zipBlob = await zip.generateAsync({ type: 'blob' });


    // Create a temporary download link and trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(zipBlob);
    downloadLink.download = 'qrCodes_'+museum.name+'_city_'+museum.city+".zip";
    downloadLink.click();


};


       const Delete = async () => {
		var result = window.confirm("Want to delete?");
        if (result) {
    //Logic to delete the item

        fetch('http://127.0.0.1:8000/museums/list_museums/'+museumId,{method:"DELETE"})
        .then((response)=>{
            if(!response.ok){
                throw new Error('not deleted')
            }
            navigate('/museums/');
        }
        ).catch((e)=>{console.log(e)});
    }}

    let src_url='http://maps.google.com/maps?q='+museum?.country+'+'+museum?.city+'+'+museum?.location+'&z=18&output=embed'


	return (
		<div>
		<HeaderMuseumAdministrator museum={museum} />


     {profile?.id===museum?.profile?.id && (<div>
     <Link to={'/addPost/'+museumId}><button className="edit_button">&#x270E;Edit Museum</button></Link>
	<Link to={'/addPost/'+museumId}><button className="add_button">&#x2713;Add Exponate</button></Link>
	<button className="delete" className="delete_button" onClick={Delete}>&#x2716;Delete Museum  </button></div>
	)}

<div className="body_list">
  <button className="add_button" onClick={downloadQrCodes}>&#x2193;  Download QrCodes</button>


<form class="search" action="">
  <input type="search" placeholder="Search by name..."
    defaultValue={searchTerm}
    onChange={handleChange}
   required/>


</form>


     {searchTerm && searchResults.map((post, index) =>(<ItemPost   key={index} post={post}/>)) }
    {!searchTerm && posts.map((post, index) =>(<ItemPost   key={index} post={post}/>))  }
</div>
<Footer2/>

		</div>
		)
};

export default MuseumDetail