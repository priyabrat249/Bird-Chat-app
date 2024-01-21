import React from 'react'
import logo from '../img/logo.ico'
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
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
              <img src="https://images.pexels.com/photos/19804308/pexels-photo-19804308/free-photo-of-aisha_.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='' />
              <span>Jesica</span>
              <button onClick={handleSubmit}>logout</button>
          </div>
    </div>
  )
}

export default Navbar