import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
// import { IoMdLogIn } from "react-icons/io";


const Navbar = () => {
  // const navigate = useNavigate();
  return (
    <div className='h-full w-[70px] bg-black fixed flex flex-col gap-2 items-center justify-start px-2 py-8'>
        <MdAccountCircle color='white' size={30} />
        {/* <button onClick={()=>navigate('/login')} className='text-white flex flex-col gap-3'>Login</button>      Not Needed as useeffect k navigate se directed  to login                         */}
    </div>
  )
}

export default Navbar;