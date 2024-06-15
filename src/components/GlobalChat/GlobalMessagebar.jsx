import { useState , useContext } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import { doc, arrayUnion, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/firebaseconfig';
import Attachment from "../../assets/attachment.gif";
import Microphone from "../../assets/microphone.gif";
import { context } from '../../utils/context';

const MessageBar = ({ userId, userData }) => {
  const { region } = useContext(context);

  const [message, setMessage] = useState('');
  const [anonymous, setAnonymous] = useState(false); 

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (!message.trim()) {
      console.log("Message is empty.");
      return;
    }

    if (!userId) {
      console.log("User ID is undefined.");
      return;
    }

    let senderUsername = userData?.username;
    if (anonymous) {
      senderUsername = "Anonymous";
    }

    console.log("Sender ID:", userId);
    console.log("Sender Username:", senderUsername);
    console.log("Message:", message);
    // console.log(userData);
    // console.log(userData?.region);

    const stringCode = `${region?.country}${region?.state}${region?.city}`;
    console.log(`Updating document: livechat/${stringCode}`);

    try {
      const docRef = doc(db, "livechat", stringCode);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        console.log(`Document livechat/${stringCode} exists, updating it.`);
        await updateDoc(docRef, {
          chats: arrayUnion({
            senderid: userId || "Unknown",
            senderusername: senderUsername || "Unknown",
            message: message || "No message",
            region: userData?.region || "Unknown",
          })
        });
      } else {
        console.log(`Document livechat/${stringCode} does not exist, creating it.`);
        await setDoc(docRef, {
          chats: [{
            senderid: userId || "Unknown",
            senderusername: senderUsername || "Unknown",
            message: message || "No message",
            region: userData?.region || "Unknown",
          }]
        });
      }

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

  return (
    <div className='h-[60px] w-full border border-t-gray-300 px-3 p-1 flex justify-center items-center'>
      <div className='w-2/3 flex justify-center items-center gap-2 rounded-md border border-gray-200 p-2 '>
        <img src={Attachment} alt='interactive Attachment icon' className='h-8 w-8 mx-3' />
        <input type='text' placeholder='Type a message here ' value={message} onChange={handleChange} onKeyDown={handleKeyDown} name='message' className='w-2/3 outline-none px-3 py-1 text-gray-800 border-none bg-transparent' />
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
