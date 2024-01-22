import logo from "../img/logo.ico"
import { getAuth, signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { getApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"; 
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore"; 
import {auth,storage,db} from "../firebase.js"
import { useNavigate,Link } from "react-router-dom";
import Add from "../img/addAvatar.png"


function Login() {
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState(false);
  const [upMessage, setUpMessage] = useState("Add an avatar");
  const navigate = useNavigate();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const email = e.target[0].value;
    const password = e.target[1].value;
    

      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed In
          const user = userCredential.user;
        // ...
        navigate("/")
      
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErr(true);
        const errorCode = error.code;
        setErrMessage(errorMessage);
      });;   

  }
    return (
      <div className="formContainer">
        <div className="formWrapper">
        <div className="logo">
            <img src={logo} alt="" />
          </div>
          <span className="title">Log In</span>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password" />
                    
            <button >Log In</button>
          </form>
          <p>Don't have an  account?{" "}<Link to="/register">Register</Link></p>
        </div>
      </div>
    );
  }
  
  export default Login;
  