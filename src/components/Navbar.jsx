import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
// import { IoMdLogIn } from "react-icons/io";


const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='h-full w-[70px] bg-black fixed flex flex-col gap-2 items-center justify-start px-2 py-8'>
        <MdAccountCircle color='white' size={30} />
        <button onClick={()=>navigate('/login')}>Login</button>
    </div>
  )
}

export default Navbar;