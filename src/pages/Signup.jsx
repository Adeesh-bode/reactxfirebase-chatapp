import React, { useState , useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';   // 1. import the function to be used
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../utils/firebaseconfig'; // 2. import our key from utils 
import { provider } from '../utils/firebaseconfig';  


import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useSnackbar } from 'notistack';

import { FcGoogle } from "react-icons/fc";
import Connect from '../assets/connect.gif';


const Signup = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [ passwordStrength , setPasswordStrength ] = useState(false);
  const navigate = useNavigate();
  const [ credentials , setCredentials ] = useState({
    email: "",
    password:"",
    username:"",
    uid:"",
    bio:"Hello!"
  }) 

  const handleChange =(e)=>{
    setCredentials({ ... credentials , [e.target.name] : [e.target.value] })
    credentials.password[0].length<6 ? (setPasswordStrength(false) ) : (setPasswordStrength(true));
    console
    console.log(passwordStrength);
  }
  
  
  const handleSubmit = async (e)=>{
    e.preventDefault(); // to avoid refresh of page
    const { email,password } = credentials;
    // console.log(credentials);
    console.log(email[0] , password[0]);
    await createUserWithEmailAndPassword(auth , email[0] , password[0])  // this function returns a promise can say response which is useful for ack and data
    .then((usercredentials)=>{                                     // like try catch block we use then catch block
      console.log("Successfully Signed Up");   
      const user = usercredentials.user;

      enqueueSnackbar('Sign up Successful ',{
        variant:'success',
        autoHideDuration:3000,
        anchorOrigin:{ horizontal:'center', vertical:'top'},
        dense:true,
      })

      console.log(user);
    })
    .catch((error)=>{
      console.log("Error Code:", error.code);
      console.log("Error Message:", error.message);
      if(error.code === 'auth/network-request-failed'){
        enqueueSnackbar('Check your internet connection',{
          variant : 'error',
          autoHideDuration: 3000,
          anchorOrigin:{ horizontal: 'center' , vertical: 'top' },
          dense:true, 
        });
      }
      else if(error.code === 'auth/invalid-email'){
        enqueueSnackbar('Not a valid E-mail',{
          variant : 'error',
          autoHideDuration: 3000,
          anchorOrigin:{ horizontal: 'center' , vertical: 'top' },
          dense:true, 
        });
      }
      else if(error.code === 'auth/weak-password'){
        enqueueSnackbar('Password should be at least 6 characters',{
          variant : 'error',
          autoHideDuration: 3000,
          anchorOrigin:{ horizontal: 'center' , vertical: 'top' },
          dense:true, 
        });
      }
      else if(error.code === 'auth/email-already-in-use'){
        enqueueSnackbar('Email already in use',{
          variant : 'error',
          autoHideDuration: 3000,
          anchorOrigin:{ horizontal: 'center' , vertical: 'top' },
          dense:true, 
        });
      }
    })
    console.log(credentials)
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
    <div className='bg-[#2d2a2a] w-screen h-screen flex justify-center items-center '>

    <div className='flex justify-around items-center bg-white   gap-4 w-2/5 h-1/2'>
      <form onSubmit={(e)=>handleSubmit(e)}
        className='flex flex-col  h-fit w-fit p-5 gap-4' 
      > 
          <div className='text-3xl  text-center text-teal-500'>Sign Up</div>
          <input type='text' placeholder='username' name='username' onChange={(e)=>handleChange(e)}
          className=' px-2 py-1 bg-transparent border'
          ></input>
          <input type='text' placeholder='email' name='email' onChange={(e)=>handleChange(e)}
          className=' px-2 py-1 bg-transparent border'
          ></input>
          <div className='flex flex-col gap-1'>
          <input type='text' placeholder='password' name='password' onChange={(e)=>handleChange(e)} 
          className=' px-2 py-1 bg-transparent border'
          ></input> 
          { !passwordStrength && <div className='text-[10px] text-slate-700'>Password should be at least 6 characters</div> }
          </div>
          <input type='submit' className='bg-teal-600 text-white w-full py-1'></input>
          {/* <button onClick={()=>handleGoogleSignin()} 
            className='text-white justify-center flex items-center gap-2 bg-[#2d2a2a] px-2 py-1 border border-white hover:bg-teal-500 hover:text-black'
          >
            <FcGoogle size={30} className='text-teal-500'/>
            Sign in
          </button>       */}
      </form>
      <div className='w-fit h-fit  flex flex-col justify-between items-center'> 
        <div>Let's Connect</div>
        <img src={Connect} alt='interactive-img' />
      </div>

    </div>
    </div>
  )
}

export default Signup;