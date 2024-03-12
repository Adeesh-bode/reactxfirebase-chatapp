import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebaseconfig';
import { useNavigate } from 'react-router-dom';

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
          console.log("User is not signed in");
          navigate("/login");
        }
      }
      catch(error){
        console.log(error.message)
      }
    })
  },[])

  return (
    <div className='w-screen h-screen'>
      <Navbar />
      Home
    </div>
  )
}

export default Home;