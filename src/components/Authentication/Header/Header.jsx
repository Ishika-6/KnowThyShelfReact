import React,{useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'  ;
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import {imageDb} from "../../../assets/scripts/firebase"
import {app,useAuth,upload} from "../../../assets/scripts/firebase"
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"

import './header.css'
import logo from './logo.jpg' 
import profilePic from './sungjinwoo.jpg'

const auth=getAuth(app);

const Header = () => {

  const currentUser=useAuth();
  const [photo,setPhoto]=useState(null);
  const [loading,setLoading]=useState(false);
  const [photoURL,setPhotoURL]=useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTEw_De963pYsWjudWc56nI-ervEsZi6EOt9Qbcvs5Ww&s');
  useEffect(()=>{
    if(currentUser?.photoURL){
      setPhotoURL(currentUser.photoURL);
    }
  },[currentUser]);
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <ul>
        <li><a href="./dashboard">Home</a></li>
        <li><a href="./profile">Profile</a></li>
        <li><a href="./library">Library</a></li>
        <li><a href="./browser">Browse</a></li>
        <li><a href="./premium">Premium</a></li>
        <li><button onClick={()=>signOut(auth)} className='button'>Logout</button></li>
      </ul>

      <div className="profilePic">
        <FontAwesomeIcon icon={faSearch} />
        <img src={photoURL||profilePic} alt="Profile-Pic" style={{ borderRadius: '50%' }} />
      </div>
    </header>
  );
};

export default Header;