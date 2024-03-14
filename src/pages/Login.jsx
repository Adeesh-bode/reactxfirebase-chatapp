import React, { useState , useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';   // 1. import the function to be used
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { FaGoogle } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";



import { auth } from '../utils/firebaseconfig'; // 2. import our key from utils
import { provider } from '../utils/firebaseconfig';  

// import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useSnackbar } from 'notistack';


const Login = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const [ status , setStatus ] = useState(0);
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
    // console.log(credentials);
    // console.log(email[0] , password[0]);
    await signInWithEmailAndPassword(auth , email[0] , password[0])  // this function returns a promise can say response which is useful for ack and data
    .then((usercredentials)=>{                                     // like try catch block we use then catch block
      console.log("Successfully Logged In"); 
      console.log("Successfully Logged In"); 
      console.log("Successfully Logged In"); 
      console.log("Successfully Logged In"); 

      const user = usercredentials.user;
      console.log(user);
      
      enqueueSnackbar('Log in Successful ',{
        variant : 'success',
        autoHideDuration: 6000,
        anchorOrigin:{ horizontal: 'center' , vertical: 'top' },
        dense:true, 
      });


    })
    .catch((error)=>{
      console.log(error.code);
      if(error.code === "auth/invalid-credential" || error.code === "auth/invalid-email"){
        enqueueSnackbar('Invalid Credential',{
          variant : 'error',
          autoHideDuration: 3000,
          anchorOrigin:{ horizontal: 'center' , vertical: 'top' },
          dense:true, 
        });
      }
      else if(error.code === 'auth/network-request-failed'){
        enqueueSnackbar('Check your internet connection',{
          variant : 'error',
          autoHideDuration: 3000,
          anchorOrigin:{ horizontal: 'center' , vertical: 'top' },
          dense:true, 
        });
      }
    })
  }


  const handleGoogleSignin = async ()=>{
    await signInWithPopup(auth, provider)
    .then((result)=>{
      console.log("Successfully Logged in using Google");
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    })
    .catch((error)=>{

      console.log(error.code);
      console.log(error.message);
    })
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
    <div className='flex justify-center items-center w-screen h-screen flex flex-col  gap-4'>
      <form onSubmit={(e)=>handleSubmit(e)}
        className='flex flex-col bg-[#2d2a2a] h-fit w-fit p-5 gap-4' 
      > 
          <div className='text-3xl  text-center text-teal-500'>Login</div>
          <input type='text' placeholder='Email' name='email' onChange={(e)=>handleChange(e)} 
          className=' px-2 py-1 bg-transparent border border-white text-white'
          ></input>
          <input type='text' placeholder='Password' name='password' onChange={(e)=>handleChange(e)}
          className=' px-2 py-1 bg-transparent border border-white text-white'
          ></input>
          <input type='submit' className='bg-teal-600 text-white   w-full'></input>
      </form>
      <button onClick={()=>handleGoogleSignin()} 
      className='text-white flex items-center gap-2 bg-[#2d2a2a] px-2 py-1 border border-white hover:bg-teal-500 hover:text-black'
      >
      <FaGoogle size={30} className='text-teal-500'/>
        Sign in
        </button>

      <button onClick={()=>navigate('/signup')}
      className='text-white flex items-center gap-2 bg-[#2d2a2a] px-2 py-1 border border-white hover:bg-teal-500 hover:text-black'      
      >
      <FaExternalLinkAlt />
        Signup
        </button>

    </div>
  )
}

export default Login; 