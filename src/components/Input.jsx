import React from 'react'
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { IoSendSharp } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import { BsImage } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
const Input = () => {
  return (
    <div className='parInput'>
      <div className='input'>
      <input style={{display:"none"}} type="file" id="file" />
        <label htmlFor="file">
        <FaPlus style={{color: '#2f2d52',fontSize:"18px", cursor:"pointer",paddingRight:"10px",paddingTop:"2px" }} alt="" />
        </label>
      <input type="text" placeholder='Type something...'/>
      <div className="send">
        <input style={{display:"none"}} type="file" id="file" />
        <label htmlFor="file">
        <IoMdAttach style={{color: '#2f2d52',fontSize:"26px", cursor:"pointer" }} alt="" />
        </label>
          
        <input style={{display:"none"}} type="file" id="file" />
        <label  htmlFor="file">
          <BsImage style={{cursor:"pointer",color: '#2f2d52',fontSize:"24px" }}  alt="" />   
        </label>
        <IoSendSharp style={{ color: '#2f2d52',fontSize:"26px" , cursor:"pointer"}}/>
      </div>
      </div>
      </div>
  )
}

export default Input