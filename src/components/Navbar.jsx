import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import { MdAccountCircle } from "react-icons/md";
// import { IoMdLogIn } from "react-icons/io";

import Profile from '../assets/user_dp.jpeg'
import { GoHomeFill } from "react-icons/go";

import { MdGroups } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { HiInboxArrowDown } from "react-icons/hi2";
import { BsThreeDots } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa6";

import { signOut } from "firebase/auth";
import { auth } from '../utils/firebaseconfig';

// import { useSnackbar } from 'notistack';
import { FaTelegramPlane } from "react-icons/fa";

import { useContext } from 'react';
import { context } from '../utils/context';
import { useSnackbar } from 'notistack';

const Navbar = () => {
  const { navigate } = useContext(context);
  const { showSnackbar } = useSnackbar(); // custom Hook :-)
  // const navigate = useNavigate();

  // const { enqueueSnackbar, closeSnackbar } = useSnackbar(); 
  // const navigate = useNavigate();
  
  const handleSignOut=()=>{
    signOut(auth)
    .then(()=>{
      console.log('Signout Successful');

      showSnackbar('Signout Successful',3000,'success');
      
      // enqueueSnackbar('Signout Successful',{
        //   variant:'success',
        //   autoHideDuration:3000,
      //   anchorOrigin:{ horizontal:'center', vertical:'top'},
      //   dense:true,
      // })
      
      navigate('/login');
    })
    .catch((error)=>{
      console.log('Error in Signout:',error);
      
      showSnackbar('Some Error Occured',3000,'error');

      // enqueueSnackbar('Error Occured',{
      //   variant:'Failure',
      //   autoHideDuration:3000,
      //   anchorOrigin:{ horizontal:'center', vertical:'top'},
      //   dense:true,
      // })
    })
  }
  
  return (
    <div className='h-screen w-[100px] bg-black flex flex-col justify-between gap-2 items-center  px-2 py-8'>
        {/* <MdAccountCircle color='white' size={30} /> */}
        {/* <button onClick={()=>navigate('/login')} className='text-white flex flex-col gap-3'>Login</button>      Not Needed as useeffect k navigate se directed  to login                         */}
        <div>
            <img src={Profile} alt='user profile Image' className='h-12 w-12 rounded-full object-cover'/>
        </div>
        <div className='flex flex-col gap-5 '>
          <GoHomeFill className='text-white opacity-60 h-8 w-8 hover:opacity-100 '/>
          <MdGroups className='text-white opacity-60 h-8 w-8  hover:opacity-100' />
          <FaTelegramPlane className='text-white opacity-60 h-8 w-8  hover:opacity-100' onClick={()=>navigate('/chatroom')} />
          <HiInboxArrowDown  className='text-white opacity-60 h-8 w-8  hover:opacity-100' />
          <IoSettingsSharp  className='text-white opacity-60 h-8 w-8  hover:opacity-100' />
          <BsThreeDots className='text-white opacity-60 h-8 w-8 hover:opacity-100 ' />
        </div>
        <div>
          <FaPowerOff className='text-white opacity-60 h-8 w-8  hover:opacity-100' onClick={()=>handleSignOut()} />
        </div>
    </div>
  )
}

export default Navbar;