import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { getApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"; 
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore"; 
import {auth,storage,db} from "../firebase.js"
import { useNavigate } from "react-router-dom";
import Add from "../img/addAvatar.png"
import logo from "../img/logo.ico"
function Register() {
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState(false);
  const [upMessage, setUpMessage] = useState("Add an avatar");
  const navigate = useNavigate();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    const photoURL = "";
    if (file) console.log(file.name);

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
        const storageRef = ref(storage,displayName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + ' % done');
            switch (snapshot.state) {
              case 'paused':
                setUpMessage("Paused uploading...");
                console.log('Upload is paused');
                break;
              case 'running':
                setUpMessage("Uploading...");
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                setUpMessage("Unauthorized user");
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                setUpMessage("Upload cancelled");
                // User canceled the upload
                break;
        
              // ...
        
              case 'storage/unknown':
                setUpMessage("Unknown error");
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          }, 
          () => {
            setUpMessage("Uploaded successfully");
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateProfile(user, {
                displayName,
                photoURL: downloadURL
              });
              await setDoc(doc(db, "users", user.uid), {
                uid:user.uid,
                displayName,
                email,
                photoURL:downloadURL,
              });
            //   const createDocument = ("userChats", ) => {
            //     const colRef = collection(db, collectionName);
            //     return addDoc(colRef, document);
            // };
              await setDoc(doc(db, "userChats",user.uid), {});
              navigate("/")
            });
            console.log(user);
          }
        );
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
          <span className="logo">
            <img src={logo} alt="" />
          </span>
          <span className="title">Register</span>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="display name" />
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password" />
            <input style={{display:"none"}} type="file" id="file" />
            <label  htmlFor="file">
              <img style={{cursor:"pointer"}} src={Add} alt="add avatar" />
              <span>{upMessage}</span>        
            </label>        
            <button>Sign Up</button>
          </form>
          <p>You do have an  account? Login</p>
          {err && <span style={{color:"red"}}>{errMessage.substr(10)}</span> }
        </div>
      </div>
    );
  }
  
  export default Register;
  