import React, { useState , useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';   // 1. import the function to be used
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../utils/firebaseconfig'; // 2. import our key from utils 
import { provider } from '../utils/firebaseconfig';  


import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useSnackbar } from 'notistack';

const Signup = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [ passwordStrength , setPasswordStrength ] = useState(false);
  const navigate = useNavigate();
  const [ credentials , setCredentials ] = useState({
    email: "",
    password:"",
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
    <div className='flex justify-center items-center w-screen h-screen'>
      <form onSubmit={(e)=>handleSubmit(e)}
        className='flex flex-col bg-[#2d2a2a] h-fit w-fit p-4 gap-3' 
      > 
          <div className='text-3xl  text-center'>Sign Up</div>
          <input type='text' placeholder='email' name='email' onChange={(e)=>handleChange(e)}></input>
          <input type='text' placeholder='password' name='password' onChange={(e)=>handleChange(e)} ></input> 
          { !passwordStrength && <div>Password should be at least 6 characters</div> }
          <input type='submit' className=''></input>
      </form>

      <button onClick={()=>handleGoogleSignin()} >Google Sign Up</button>
    </div>
  )
}

export default Signup;