import React, { useState , useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';   // 1. import the function to be used
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { FcGoogle } from "react-icons/fc";
import { FaExternalLinkAlt } from "react-icons/fa";

import showResult from '../utils/notistack';

import { auth } from '../utils/firebaseconfig'; // 2. import our key from utils
import { provider } from '../utils/firebaseconfig';  

// import { SnackbarProvider, enqueueSnackbar } from 'notistack';

import Connect from '../assets/connect.gif';
import useCustomSnackbar from '../utils/notistack';


import { useContext } from 'react';
import { context } from '../utils/context';

const Login = () => {
  const { credentials, setCredentials , user , setUser} = useContext(context);
  const showSnackbar = useCustomSnackbar(); 
  // console.log(showSnackbar);
  // const [ status , setStatus ] = useState(0);
  const navigate = useNavigate();
  // const [ credentials , setCredentials ] = useState({
  //   email: "",
  //   password:"",
  // }) 

  const handleChange =(e)=>{
    setCredentials({ ... credentials , [e.target.name] : e.target.value});
    // console.log(credentials);
  }
  
  
  const handleSubmit = async (e)=>{
    e.preventDefault(); // to avoid refresh of page
    const { email,password } = credentials;
    // console.log(credentials);
    // console.log(email[0] , password[0]);
    await signInWithEmailAndPassword(auth , email , password)  // this function returns a promise can say response which is useful for ack and data
    .then((usercredentials)=>{                                     // like try catch block we use then catch block
      console.log("Successfully Logged In"); 
      

      const user = usercredentials.user;
      // console.log(user);
      
      // enqueueSnackbar('Log in Successful ',{
      //   variant : 'success',
      //   autoHideDuration: 6000,
      //   anchorOrigin:{ horizontal: 'center' , vertical: 'top' },
      //   dense:true, 
      // });
      showSnackbar('Log in Successful',3000, 'success');
      
      
    })
    .catch((error)=>{
      // console.log(error.code);
      if(error.code === "auth/invalid-credential" || error.code === "auth/invalid-email"){
        showSnackbar('Incorrect E-mail or Password',3000, 'failure');
        // enqueueSnackbar('Invalid Credential',{
          //   variant : 'error',
          //   autoHideDuration: 3000,
          //   anchorOrigin:{ horizontal: 'center' , vertical: 'top' },
          //   dense:true, 
          // });
        }
        else if(error.code === 'auth/network-request-failed'){
        showSnackbar('Check Your Network Connection',3000, 'success');
        // enqueueSnackbar('Check your internet connection',{
        //   variant : 'error',
        //   autoHideDuration: 3000,
        //   anchorOrigin:{ horizontal: 'center' , vertical: 'top' },
        //   dense:true, 
        // });
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

  useEffect(()=>{                                         /// observer
    onAuthStateChanged( auth, (user)=>{
      try{

        if(user){
          navigate("/");
          setUser(user);
          console.log("User is signed in:",user);
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
    <div className=' bg-[#2d2a2a] w-screen h-screen flex justify-center items-center ' >

    <div className='flex  justify-around items-center bg-white gap-4 w-2/5 h-1/2 rounded-md'>
      <form onSubmit={(e)=>handleSubmit(e)}
        className='flex flex-col  h-fit w-fit p-5 gap-4' 
      > 
          <div className='text-3xl  text-center text-teal-500'>Login</div>
          <input type='text' placeholder='Email' name='email' onChange={(e)=>handleChange(e)} 
          className=' px-2 py-1 bg-transparent border'
          ></input>
          <input type='text' placeholder='Password' name='password' onChange={(e)=>handleChange(e)}
          className=' px-2 py-1 bg-transparent border'
          ></input>
          <input type='submit' className='bg-teal-600 text-white w-full py-1'></input>
          <button onClick={()=>handleGoogleSignin()} 
            className='text-white justify-center flex items-center gap-2 bg-[#2d2a2a] px-2 py-1 border hover:bg-transparent  hover:border-black  hover:text-black'
          >
            <FcGoogle size={30} className='text-teal-500'/>
            Sign in
          </button>
      <div className='flex justify-between w-full '>
      
      <div onClick={()=>navigate('/signup')} className='text-teal-400 flex justify-center gap-2 items-center cursor-pointer' >
        <FaExternalLinkAlt className=''/>
        Don&apos;t have an account?
      </div>
      </div>
      </form>
      <div className='w-fit h-fit  flex flex-col justify-between items-center'> 
        <div>Let&apos;s Connect</div>
        <img src={Connect} alt='interactive-img' />
      </div>
      

    </div>
    </div>
  )
}

export default Login; 