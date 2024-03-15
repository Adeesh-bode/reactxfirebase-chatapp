import React from 'react'
import UserImg from '../assets/user_dp.jpeg';


const UserHighlight = () => {
  return (
    <div className='bg-white border rounded-md w-full p-3'>
        <div className=' flex justify-start  items-center gap-2'>
            <img src={UserImg} alt='user profile Image' className='h-14 w-14 mx-3 rounded-full object-cover'/>
            <div className=' flex flex-col '>
                        <div className='font-bold'>GFG President</div>
                <div className='text-gray-500'>Online</div>
            </div>
        </div>
        <div className=' flex justify-around gap-3 px-3'>
            <div>
                Next Event ki planning ...    
            </div>
            <div className='text-white  bg-teal-500 rounded-full p-1 w-7 h-7 flex justify-center items-center'> 2 </div>
        </div>
    </div>
  )
}

export default UserHighlight