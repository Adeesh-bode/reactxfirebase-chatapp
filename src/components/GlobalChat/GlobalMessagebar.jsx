import { useEffect, useState } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import { collection, doc, arrayUnion, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebaseconfig';
import Attachment from "../../assets/attachment.gif";
import Microphone from "../../assets/microphone.gif";

const MessageBar = ({ userId }) => {
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState({});
  const [anonymous, setAnonymous] = useState(false); 

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    console.log(message);

    if (!userId) {
      console.log("User ID is undefined.");
      return;
    }

    let senderUsername = userData.username;
    if (anonymous) {
      senderUsername = "Anonymous";
    }

    try {
      await updateDoc(doc(db, "livechat", "live"), {
        data: arrayUnion({
          senderid: userId,
          senderusername: senderUsername,
          message: message,
        })
      });
      console.log("Message Sent");
      setMessage('');
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("User_ID:", userId);
        const userDoc = await doc(db, "users", userId).get(); 
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("---------------------------------------------");
          console.log("User Data---------", userData);
          setUserData(userData);
        } else {
          console.log("User document not found.");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserData();
  }, [userId]); // Depend on userId

  return (
    <div className='h-[60px] w-full border border-t-gray-300 px-3 p-1 flex justify-center items-center'>
      <div className='w-2/3 flex justify-center items-center gap-2 rounded-md border border-gray-200 p-2 '>
        <img src={Attachment} alt='interactive Attachment icon' className='h-8 w-8 mx-3' />
        <input type='text' placeholder='Type a message here ' value={message} onChange={(e) => handleChange(e)} onKeyDown={handleKeyDown} name='message' className='w-2/3 outline-none px-3 py-1 text-gray-800 border-none bg-transparent' />
        <img src={Microphone} alt='interactive Microphone icon' className='h-8 w-8 mx-3' />
        <div className='h-8 w-8 bg-teal-500 rounded-full flex justify-center items-center'>
          <FaTelegramPlane className='h-6 w-6 text-white' onClick={sendMessage} />
        </div>
        <button onClick={() => setAnonymous(!anonymous)} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md focus:outline-none w-auto h-">{anonymous ? "User" : "Anonymously"}</button>
      </div>
    </div>
  );
};

export default MessageBar;
