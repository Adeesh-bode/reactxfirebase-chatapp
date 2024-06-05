import { useEffect, useState } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import { collection, doc, arrayUnion, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebaseconfig';
import Attachment from "../../assets/attachment.gif";
import Microphone from "../../assets/microphone.gif";

const MessageBar = ({ userdata }) => {
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState({});

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log(message);

    // Check if userId and userData.username are defined
    if (!userId ) {
      console.log("User ID is undefined.");
      return;
    }
    else if (!userData.username) {  
      console.log("username is undefined.");
    }

    try {
      await updateDoc(doc(db, "livechat", "live"), {
        data: arrayUnion({
          senderid: userId,
          senderusername: userData.username,
          message: message,
        })
      });
      console.log("Message Sent");
      setMessage('');
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("User_ID:", userId);
        const q = query(collection(db, "users"), where("uid", "==", userId));

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            console.log("---------------------------------------------");
            console.log("User Data---------", doc.data());
            setUserData(doc.data());
          });
        } else {
          console.log("No matching documents.");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserData();
  }, [userId]); // Depend on userId


  console.log("|||||||||||||||||||", userId);
  return (
    <div className='h-[60px] w-full border border-t-gray-300 px-3 p-1 flex justify-center items-center'>
      <div className='w-2/3 flex justify-center items-center gap-2 rounded-md border border-gray-200 p-2 '>
        <img src={Attachment} alt='interactive Attachment icon' className='h-8 w-8 mx-3' />
        <input type='text' placeholder='Type a message here ' value={message} onChange={(e) => handleChange(e)} name='message' className='w-2/3 outline-none px-3 py-1 text-gray-800 border-none bg-transparent' />
        <img src={Microphone} alt='interactive Microphone icon' className='h-8 w-8 mx-3' />
        <div className='h-8 w-8 bg-teal-500 rounded-full flex justify-center items-center'>
          <FaTelegramPlane className='h-6 w-6 text-white' onClick={(e) => sendMessage(e)} onDragEnter={(e) => sendMessage(e)} />
        </div>
      </div>
    </div>
  );
};

export default MessageBar;
