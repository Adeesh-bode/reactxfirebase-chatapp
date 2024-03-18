import React from 'react';

import Attachment from "../assets/attachment.gif";
import Microphone from "../assets/microphone.gif";
// import Sent from "../assets/paper-plane.gif";
import { FaTelegramPlane } from "react-icons/fa";

import { useContext , useState } from 'react';
import { context } from '../utils/context';

import { db } from '../utils/firebaseconfig';
import { setDoc , doc, arrayUnion } from 'firebase/firestore';


import { updateDoc } from 'firebase/firestore';


const MessageBar = ( { live }) => {
  const { credentials , user } = useContext(context);
  const [ message , setMessage ] = useState(''); 

  const handleChange = (e)=>{
   setMessage(e.target.value); 
  }

  const sendMessage = async (e)=>{
    e.preventDefault();
    console.log(message);


    // const docRef = doc(db,"liveChat","live"); // better pass this var inside the updateDoc
    console.log("User:",user);

    await updateDoc(doc(db,"livechat","live"),{
      data: arrayUnion({
        senderid: user.uid,
        senderusername: user.username,
        message: message,
      })
    })
    .then(()=>{
      console.log("Message Sent");
      setMessage('');
    })
    .catch((error)=>{
      console.log(error.message);
    })

    // await setDoc(doc(db,"livechat","Yaha Combined Id"),{
    //   message: message,
    //   sender: credentials.username,
    //   uid: credentials.uid,
    //   timestamp: new Date(),
    // })
    // .then(()=>{
    //   console.log("Message Sent");
    // })
    // .catch((error)=>{
    //   console.log(error.message);
    // })
  }

  return (
    <div className='h-[60px] w-full border border-t-gray-300 px-3 p-1 flex justify-center items-center'>
        <div className='w-2/3 flex justify-center items-center gap-2 rounded-md border border-gray-200 p-2 '>
            <img src={Attachment} alt='interactive Attachment icon'  className='h-8 w-8 mx-3 '/>
            <input type='text' placeholder='Type a message here ' value={message} onChange={(e)=>handleChange(e)}  name='message' className=' w-2/3 outline-none  px-3 py-1 text-gray-800 border-none bg-transparent'></input>
            <img src={Microphone} alt='interactive Microphone icon' className='h-8 w-8 mx-3 ' />
            <div className='h-8 w-8 bg-teal-500 rounded-full flex justify-center items-center'>
              <FaTelegramPlane className='h-6 w-6  text-white ' onClick={(e)=>sendMessage(e)} onDragEnter={(e)=>sendMessage(e)} />
              {/* <img src={Sent} alt='interactive Sent icon' className='h-8 w-8 object-cover  bg-transparent' /> */}
            </div>
        </div>
    </div>
  )
}

export default MessageBar