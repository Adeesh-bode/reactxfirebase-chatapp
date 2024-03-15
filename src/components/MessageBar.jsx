import React from 'react';

import Attachment from "../assets/attachment.gif";
import Microphone from "../assets/microphone.gif";
// import Sent from "../assets/paper-plane.gif";
import { FaTelegramPlane } from "react-icons/fa";


const MessageBar = () => {
  return (
    <div className='h-[60px] w-full border border-t-gray-300 px-3  flex justify-center items-center'>
        <div className='w-2/3 flex justify-center items-center gap-2 rounded-md border border-gray-200 p-2 '>
            <img src={Attachment} alt='interactive Attachment icon'  className='h-8 w-8 mx-3 '/>
            <input type='text' placeholder='Type a message here ' name='search' className=' w-2/3 outline-none  px-3 py-1 text-slate-700 border-none bg-transparent'></input>
            <img src={Microphone} alt='interactive Microphone icon' className='h-8 w-8 mx-3 ' />
            <div className='h-8 w-8 bg-teal-500 rounded-full flex justify-center items-center'>
              <FaTelegramPlane className='h-6 w-6  text-white ' />
              {/* <img src={Sent} alt='interactive Sent icon' className='h-8 w-8 object-cover  bg-transparent' /> */}
            </div>
        </div>
    </div>
  )
}

export default MessageBar