import { useEffect, useState } from 'react';
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebaseconfig';

import Attachment from "../../../assets/attachment.gif";
import Microphone from "../../../assets/microphone.gif";
import { FaTelegramPlane } from "react-icons/fa";

const MessageBar = ({ userId, chatWithId }) => {
  const [message, setMessage] = useState('');
  const [chatDocId, setChatDocId] = useState(null);

  useEffect(() => {
    const determineChatDocId = async () => {
      const code1 = userId + chatWithId;
      const code2 = chatWithId + userId;

      let docRef = doc(db, "encryptedchats", code1);
      let docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setChatDocId(code1);
      } else {
        docRef = doc(db, "encryptedchats", code2);
        docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setChatDocId(code2);
        } else {
          setChatDocId(code1); // Default to code1 if neither exists
        }
      }
    };

    determineChatDocId();
  }, [userId, chatWithId]);

  useEffect(() => {
    // Clear the message input whenever the component rerenders
    setMessage('');
  }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Prevent sending empty messages

    if (!chatDocId) {
      console.error("Chat document ID is not set.");
      return;
    }

    const docRef = doc(db, "encryptedchats", chatDocId);

    try {
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        // Create a new document if it doesn't exist
        await setDoc(docRef, {
          message: []
        });
      }

      await updateDoc(docRef, {
        message: arrayUnion({
          message,
          sender: userId,
          timestamp: new Date(),
        })
      });

      console.log("Message Sent");
      setMessage(''); // Clear the message input
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='h-[60px] w-full border border-t-gray-300 px-3 p-1 flex justify-center items-center'>
      <div className='w-2/3 flex justify-center items-center gap-2 rounded-md border border-gray-200 p-2 '>
        <img src={Attachment} alt='interactive Attachment icon' className='h-8 w-8 mx-3' />
        <input 
          type='text' 
          placeholder='Type a message here' 
          value={message} 
          onChange={handleChange} 
          name='message' 
          className='w-2/3 outline-none px-3 py-1 text-gray-800 border-none bg-transparent'
        />
        <img src={Microphone} alt='interactive Microphone icon' className='h-8 w-8 mx-3' />
        <div 
          className='h-8 w-8 bg-teal-500 rounded-full flex justify-center items-center cursor-pointer' 
          onClick={sendMessage}
        >
          <FaTelegramPlane className='h-6 w-6 text-white' />
        </div>
      </div>
    </div>
  );
};

export default MessageBar;
