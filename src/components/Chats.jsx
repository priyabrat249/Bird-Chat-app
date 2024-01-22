import React, { useContext, useEffect,useState,useCallback} from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../AuthContext';
import { ChatContext } from '../ChatContext';
// const Chats = () => {
//       const { currentUser } = useContext(AuthContext);
//       const { dispatch } = useContext(ChatContext)
//       const [chats, setChats] = useState([]);
//       const handleSelect = useCallback(
//             (user) => {
//                   console.log(user);
//                   dispatch({ type: 'CHANGE_USER', payload: user });
//             },
//             [dispatch]
//       );
        
//       useEffect(() => {
//             const getChats = () => {
//                   const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
//                         setChats(doc.data());

//                   });
//                   return () => {
//                         unsub();
//                   };
//             };
//             currentUser.uid && getChats();
//       }, [currentUser.uid])
//       console.log(Object.entries(chats));
      
//       return (
//             <div className='chats'>
//                   {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                        
                              
//                         <div div className='userChat' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
//                               <img src={chat[1].userInfo.photoURL} alt="" />
//                               <div className='userChatInfo'>
//                                     <span>{chat[1].userInfo.displayName}</span>
//                                     <p>{chat[1].lastMessage?.text}</p>
//                               </div>
//                         </div>
//                   ))}
          
//     </div>
//   )
// }

// export default Chats
// import { useEffect, useState, useCallback } from 'react';
// import { doc, onSnapshot } from 'firebase/firestore';
// import { db } from '../firebase';
// import { AuthContext } from '../AuthContext';
// import { ChatContext } from '../ChatContext';

const Chats = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);

  const handleSelect = useCallback(
    (user) => {
      console.log(user);
      dispatch({ type: 'CHANGE_USER', payload: user });
    },
    [dispatch]
  );

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
            setChats(doc.data());
            console.log(doc.data());
      });
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, deps => [ currentUser.uid]);

  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <div className='userChat' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className='userChatInfo'>
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
