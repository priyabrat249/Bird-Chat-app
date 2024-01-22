import React, { useContext, useState } from 'react';
import { collection, query, where,getDocs,getDoc,setDoc,serverTimestamp,doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase.js';
import { AuthContext } from '../AuthContext.js';
import { ChatContext } from '../ChatContext';
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext)
  const handleSearch = async() => {
    const citiesRef = collection(db, "users");
    const q = query(citiesRef, where("displayName", "==", username));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (e) {
        setErr(true);
      }
  }
  const handleKey = e => {
    e.code==="Enter" && handleSearch();
  }
  const handleSelect = async () => {
    
    // console.log(user);
    dispatch({ type: "CHANGE_USER", payload: user })

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] })
      }
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
      
    } catch (err) {
    }
    setUser(null);
    setUsername("");
  }
  return (
    <>

    
    <div className="searchBar">
        <input
          id="searchQueryInput"
          type="text"
          name="searchQueryInput"
          placeholder="Search here..."
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}

         />
      <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit" onClick={handleSearch}>
        <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
          <path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
        </svg>
      </button>
      </div>
      {err && <span>User not Found</span>}
      {user && <div className='userChat' onClick={handleSelect} style={{ borderBottom: '1px solid #ccc' }}>
        <img src={user.photoURL} alt="" />
        <div className='userChatInfo'>
          <span>{user.displayName}</span>
          {/* <p>Hello!! How r u?</p> */}
        </div>
      </div>}
      </>
  );
};

export default Search;
