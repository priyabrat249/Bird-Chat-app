import React, { useContext, useEffect ,useRef} from 'react'
import { ChatContext } from '../ChatContext'
import { AuthContext } from '../AuthContext'

const Message = ({ message }) => {
  // console.log(message);
  const {currentUser}=useContext(AuthContext)
  const { data } = useContext(ChatContext)
  // console.log(data.user);
  const divRef = useRef();
  useEffect(() => {
     divRef.current?.scrollIntoView({ behavior: 'smooth',block:"end" })
  },[message]);
  // console.log(message.senderId);
  // console.log(currentUser.uid);

  return (
    <div ref={divRef} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      {/* <div className="message owner"> */}
        <div className='messageInfo'>
        <img
          src={
            message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL
          } alt="" />
            <span>just now</span>
          </div>
          <div className='messageContent'>
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}

          </div>
    </div>
  )
}

export default Message