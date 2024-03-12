import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='h-[70px] w-full '>
        <button onClick={()=>navigate('/login')}>Login</button>
    </div>
  )
}

export default Navbar