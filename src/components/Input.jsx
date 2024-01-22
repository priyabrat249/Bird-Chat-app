import React, {useState,useContext} from 'react'

import { IoSendSharp } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import { BsImage } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { ChatContext } from '../ChatContext'
import { AuthContext } from '../AuthContext'
import {  doc, updateDoc,arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore';
import { db ,storage} from '../firebase';
import { v4 as uuid } from "uuid";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"; 
const Input = () => {
  const [text, setText] = useState("");
  const[img,setImg]=useState(null);
  const {currentUser}=useContext(AuthContext)
  const { data } = useContext(ChatContext)
  const handleSend = async() => {
    if (img) {
      const storageRef = ref(storage,uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + ' % done');
          switch (snapshot.state) {
            case 'paused':
              // setUpMessage("Paused uploading...");
              console.log('Upload is paused');
              break;
            case 'running':
              // setUpMessage("Uploading...");
              console.log('Upload is running');
              break;
            default:
              console.log("Successfully Uploaded")
          }
        }, 
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              break;
            case 'storage/canceled':
              break;
            case 'storage/unknown':
              break;
            default:
              console.log("Successfully Uploaded")
          }
        }, 
          () => {
            
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img:downloadURL,
                })
              })
             
            
            });
            
          }
        );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      })
    }
    await updateDoc(doc(db, "userChats",currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]:serverTimestamp(),
    });
    
    setText("");
    setImg(null);
  }
  return (
    <div className='parInput'>
      <div className='input'>
      <input style={{display:"none"}} type="file" id="file" onChange={e=>setImg(e.target.files[0])} />
        <label htmlFor="file">
        <FaPlus style={{color: '#2f2d52',fontSize:"18px", cursor:"pointer",paddingRight:"10px",paddingTop:"2px" }} alt="" />
        </label>
        <input type="text" placeholder='Type something...' value={text} onChange={e=>setText(e.target.value)}/>
      <div className="send">
        <input style={{display:"none"}} type="file" id="file" onChange={e=>setImg(e.target.files[0])}/>
        <label htmlFor="file">
        <IoMdAttach style={{color: '#2f2d52',fontSize:"26px", cursor:"pointer" }} alt="" />
        </label>
          
        <input style={{display:"none"}} type="file" id="file" onChange={e=>setImg(e.target.files[0])}/>
        <label  htmlFor="file">
          <BsImage style={{cursor:"pointer",color: '#2f2d52',fontSize:"24px" }}  alt="" />   
        </label>
        <IoSendSharp onClick={handleSend} style={{ color: '#2f2d52',fontSize:"26px" , cursor:"pointer"}}/>
      </div>
      </div>
      </div>
  )
}

export default Input