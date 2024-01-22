import React, { useContext } from 'react'
import logo from '../img/logo.ico'
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../AuthContext.js';
const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const displayName = currentUser.displayName;
  const photoURL = currentUser.photoURL;

  const handleSubmit = () => { 
    signOut(auth);
    navigate("/login");
  }
  return (
    <div className='navbar'>
      <div className='logo'>
        <img src={logo} alt="" />
        <span className='title'>
          BIRD
        </span>
      </div> 
          <div className='user'>
        <img src={photoURL} alt='' />
        <span>{ displayName}</span>
              <button onClick={handleSubmit}>logout</button>
          </div>
    </div>
  )
}

export default Navbar