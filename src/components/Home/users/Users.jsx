
import Search from '../../../assets/search.gif';
import RecentChats from './RecentChats/RecentsChats';
import SearchResult from './SearchResult/SearchResult';
import { useState } from 'react';

import { collection, onSnapshot } from 'firebase/firestore';
import {db} from '../../../utils/firebaseconfig';
import  {  useEffect } from 'react';



const Users = () => {
  const [ inputUser , setInputUser ] = useState("");
  const [ showRecent , setShowRecent ] = useState(true);
  const [ resultUsers , setResultUsers ] = useState([]);

  useEffect(()=>{
    const collectionRef = collection(db, 'users');
    const unsubscribe = onSnapshot( collectionRef, (snapshot)=>{ // snapshot is named by us to the unprocessed data , 
      console.log(snapshot);
      const users = snapshot.docs.map((doc)=> ({ ...  doc.data(), id: doc.id})); // agar real time nhi hota toh getdocs use hota
      console.log(users);
      setResultUsers(users);
    })
    return () => unsubscribe();
  },[inputUser]);
  

  // const handleChange =(e) =>{
  //   setInputUser(e.target.value);
  //   if(inputUser.length==0){
  //     showRecent(true);
  //   }
  //   else{
  //     showRecent(false);
  //   }
  // }
  
  // console.log("Result Users Data:\n",resultUsers);
  // console.log("Result Users Data:\n",resultUsers[0]);
  // console.log("Result Users Data:\n",resultUsers[0]?.username);
  // console.log("Result Users Data:\n",resultUsers[0]?.status);
  // console.log("Result Users Data:\n",resultUsers[0]?.uid);
  // console.log("Result Users Data:\n",resultUsers?.length);
  return (
    <div className='h-screen w-1/3 bg-[#f7f5f5] flex flex-col gap-6 justify-start items-start px-6 py-8'>
        <div className='w-full flex justify-center items-center gap-2 rounded-md border border-gray-200 '>
            <img src={Search} alt='interactive search icon' />
            <input type='text' placeholder='Search User' name='search' 
            onChange={(e)=> setInputUser(e.target.value)}
            onFocus={()=>setShowRecent(false)}
            // onBlur={()=>setShowRecent(true)}
            className='outline-none  px-3 py-1 text-slate-700 border-none bg-transparent'
            ></input>
        </div>
        <div className='text-2xl px-3' >
        {
          showRecent? "Recent Chats" : "searched Users" 
        }
        </div>
        <div className='users w-full flex flex-col gap-3 overflow-auto' >
        {
          showRecent? <RecentChats /> : (resultUsers.length==0)? "No Users Found" : <SearchResult users={resultUsers} />
        }
        </div>
    </div>
  )
}

export default Users