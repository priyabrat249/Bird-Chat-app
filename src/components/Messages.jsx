import React, { useState,useContext, useEffect} from 'react'
import Message from './Message';
import { ChatContext } from '../ChatContext';
import { onSnapshot,doc } from 'firebase/firestore';
import { db } from '../firebase';
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  // const divRef = useRef();
  // console.log(data);
  useEffect(() => { 
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages); 
 
      // divRef.current?.scrollIntoView({ behavior: 'smooth',block:"end" })
  
      console.log(messages);
    })

    return () =>{
      unSub();
      
    }
  }, [data])
  // const ref = useRef();
  // useEffect(() => {
  //   divRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);
  return (
    <div className='messages'>
      { 
        messages.map(m => (
          
          <Message message={m} key={m.id}/>
        ))
      }
      
    </div>
  )
}

export default Messages