import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebaseconfig';
import { useNavigate } from 'react-router-dom';


import ChatRoom from '../components/ChatRoom';
import Users from '../components/Users';



import { getDocs } from 'firebase/firestore';

import { collection } from 'firebase/firestore';

import { db } from '../utils/firebaseconfig';

import DashboardSection from '../components/Dashboard';
import { useContext } from 'react';
import { context } from '../utils/context';



const Home = () => {
  const { dashboard } = useContext(context);

  const navigate = useNavigate();

  const fetchData = async ()=>{

    const coll = getDocs(collection(db, 'users'));  
    console.log("Collection:",coll);
   
    return coll;
  }



  useEffect(()=>{
    onAuthStateChanged( auth, (user)=>{
      try{
        if(user){
          // navigate("/");
          // const uid = user.uid;
          // console.log(uid);
          fetchData();
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
      {
        dashboard? <DashboardSection /> :
      <ChatRoom user='Technical Lead' live={false} />
      }
    </div>
  )
}

export default Home;