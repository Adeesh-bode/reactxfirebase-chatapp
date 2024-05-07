import { useState , useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';   // 1. import the function to be used
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../utils/firebaseconfig'; // 2. import our key from utils 
import { provider } from '../utils/firebaseconfig';  


import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useSnackbar } from 'notistack';

import { FcGoogle } from "react-icons/fc";
import Connect from '../assets/connect.gif';

import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../utils/firebaseconfig';

import { context } from '../utils/context';
import { useContext } from 'react';

import { FaExternalLinkAlt } from "react-icons/fa";



const Signup = () => {
  const { credentials, setCredentials , user , setUser } = useContext(context);
  const { enqueueSnackbar} = useSnackbar();
  const [ passwordStrength , setPasswordStrength ] = useState(false);
  const navigate = useNavigate();
  // const [ credentials , setCredentials ] = useState({
  //   email: "",
  //   password:"",
  //   username:"",
  //   // uid:"",
  //   status: false,
  //   // bio:"Hello!",
  //   // phonenumber: null,
  //   // lastactive: null,
  // }) 

  const handleChange =(e)=>{
    setCredentials({ ... credentials , [e.target.name] : e.target.value })
    credentials.password.length<6 ? (setPasswordStrength(false) ) : (setPasswordStrength(true));
  }
  
  
  const handleSubmit = async (e)=>{
    e.preventDefault(); // to avoid refresh of page
    const { email,password } = credentials;
    await createUserWithEmailAndPassword(auth , email , password)  // this function returns a promise can say response which is useful for ack and data
    .then(async (result)=>{                                     // like try catch block we use then catch block
      
      // notify
      enqueueSnackbar('Sign up Successful ',{
        variant:'success',
        autoHideDuration:3000,
        anchorOrigin:{ horizontal:'center', vertical:'top'},
        dense:true,
      })
      console.log("Successfully Signed Up");  
      
      // storing uid in variable u
      console.log(" Result:",result);
      const u= result?.user?.uid;
      console.log("UID:",u);
      
      // add user to database

      await setDoc(doc(db, "users", u ), {
        uid: u, 
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
        status :  true,
        // lastactive : new Date().toLocaleString(),
      })
      .then(() => {
        console.log("Document successfully written!");
        //storing the details locally
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });




      // console.log(user);
    })
    .catch((error)=>{
      // console.log("Error Code:", error.code);
      // console.log("Error Message:", error.message);
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
    // console.log(credentials)
  }



  const handleGoogleSignin = async ()=>{
    await signInWithPopup(auth, provider)
    .then((result)=>{
      console.log("Successfully Logged in using Google");
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // const user = result.user;
    })
    .catch((error)=>{

      console.log(error.code);
      console.log(error.message);
    })
  }


  useEffect(()=>{                                    /// observer
    onAuthStateChanged( auth, (user)=>{
      try{

        if(user){
          navigate("/");
          setUser(user);

          // setCredentials({ ...credentials , uid: user.uid });

          // console.log("User Credentials:",credentials );

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

    <div className='flex justify-around items-center bg-white  gap-4  w-2/5 h-auto rounded-md'>
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
          <button onClick={()=>handleGoogleSignin()} 
            className='text-white justify-center flex items-center gap-2 bg-[#2d2a2a] px-2 py-1 border hover:bg-transparent  hover:border-black  hover:text-black'
          >
            <FcGoogle size={30} className='text-teal-500'/>
            Sign in
          </button>     
          <div onClick={()=>navigate('/login')} className='text-teal-400 flex justify-center gap-2 items-center cursor-pointer' >
            <FaExternalLinkAlt className=''/>
            Already have an account?
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

export default Signup;