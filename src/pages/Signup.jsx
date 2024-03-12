import React, { useState , useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';   // 1. import the function to be used
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../utils/firebaseconfig'; // 2. import our key from utils

const Signup = () => {
  const navigate = useNavigate();
  const [ credentials , setCredentials ] = useState({
    email: "",
    password:"",
  }) 

  const handleChange =(e)=>{
    setCredentials({ ... credentials , [e.target.name] : [e.target.value] })
    // console.log(credentials);
  }
  
  
  const handleSubmit = async (e)=>{
    e.preventDefault(); // to avoid refresh of page
    const { email,password } = credentials;
    console.log(credentials);
    console.log(email[0] , password[0]);
    await createUserWithEmailAndPassword(auth , email[0] , password[0])  // this function returns a promise can say response which is useful for ack and data
    .then((usercredentials)=>{                                     // like try catch block we use then catch block
      console.log("Successfully Signed Up");   
      const user = usercredentials.user;

      console.log(user);
    })
    .catch((error)=>{
      console.log("Error Code:", error.code);
      console.log("Error Message:", error.message);
    })
    console.log(credentials)
  }

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
        }
      }
      catch(error){
        console.log(error.message)
      }
    })
  },[])

  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <form onSubmit={(e)=>handleSubmit(e)}
        className='flex flex-col bg-[#2d2a2a] h-fit w-fit p-4 gap-3' 
      > 
          <div className='text-3xl  text-center'>Sign Up</div>
          <input type='text' placeholder='email' name='email' onChange={(e)=>handleChange(e)}></input>
          <input type='text' placeholder='password' name='password' onChange={(e)=>handleChange(e)} ></input>
          <input type='submit' className=''></input>
      </form>
    </div>
  )
}

export default Signup;