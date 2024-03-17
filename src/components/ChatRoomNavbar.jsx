import React from 'react'

import FriendImg from '../assets/friend.jpg'

import Phone from '../assets/phone.gif';
import Video from '../assets/video.gif';
import Menu from '../assets/menu.gif';


const ChatRoomNavbar = ({ username }) => {
  return (
    <div className='h-[90px] w-full border border-b-gray-300 px-3  flex justify-between items-center'>
        <div className=' flex gap-2 items-center'>
            <img src={FriendImg} alt='friend-image' className='h-12 w-12 mx-3 rounded-full object-cover ' />
            <div className=' flex flex-col '>
                <div className='font-bold'>{ username }</div>
                <div className='text-gray-500'>Online</div>
            </div>
        </div>
        <div className='flex gap-5'>
            <img src={Phone} alt='phone -icon' className='h-8 w-8 mx-3 ' />
            <img src={Video} alt='phone -icon' className='h-8 w-8 mx-3 ' />
            <img src={Menu} alt='phone -icon' className='h-8 w-8 mx-3 ' />
        </div>
    </div>
  )
}

export default ChatRoomNavbar