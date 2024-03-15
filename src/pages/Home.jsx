import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebaseconfig';
import { useNavigate } from 'react-router-dom';


import ChatRoom from '../components/ChatRoom';
import Users from '../components/Users';

const Home = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged( auth, (user)=>{
      try{
        if(user){
          navigate("/");
          const uid = user.uid;
          console.log(uid);
        }
        else{
          navigate("/login");
          console.log("User is not signed in");
        }
      }
      catch(error){
        console.log(error.message)
      }
    })
  },[])

  return (
    <div className='w-screen h-screen flex '>
      <Navbar />
      <Users />
      <ChatRoom />
    </div>
  )
}

export default Home;