import { useEffect} from 'react';

import Attachment from "../../assets/attachment.gif";
import Microphone from "../../assets/microphone.gif";
// import Sent from "../assets/paper-plane.gif";
import { FaTelegramPlane } from "react-icons/fa";

import { useContext , useState } from 'react';
import { context } from '../../utils/context';

import { db } from '../../utils/firebaseconfig';
import { getDocs , doc, arrayUnion } from 'firebase/firestore';


// import { data } from 'firebase/database';
import { updateDoc } from 'firebase/firestore';

import { query, collection  } from 'firebase/firestore';
import { where } from 'firebase/firestore';

const MessageBar = (  ) => {
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
        senderusername: userData.username,
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

  // useEffect(()=>{
  //   const fetchUserData =async ()=>{
  //     try{
  //       console.log("User_ID:",user.uid);
  //       const q = query(collection(db,"users"),where("uid","==",user.uid)); // is used to find the document name

  //       const querySnapshot = await getDocs(q);
  //       if (querySnapshot.empty) {
  //         console.log("No matching documents.");
  //         return;
  //       }
  //       else{
  //         querySnapshot.forEach((doc) => {
  //           setUserData(doc.data());
  //           console.log("User Data:::::::::::::::", userData);
  //         });
  //       }
  //     }
  //     catch(error){
  //       console.log(error.message);
  //     } 
  //     }
      
  //     fetchUserData();
  // })

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       console.log("User_ID:", user.uid);
  //       const q = query(collection(db, "users"), where("uid", "==", user.uid));
  
  //       const querySnapshot = await getDocs(q);
  //       if (querySnapshot.empty) {
  //         console.log("No matching documents.");
  //         return;
  //       } else {
  //         querySnapshot.forEach((doc) => {
  //           setUserData(doc.data());
  //           // Removed the console.log here because userData won't be updated immediately
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  
  //   fetchUserData();
  // }, []); // Dependency array is empty, so this effect runs only once on mount
  
  // // Add another useEffect to act on userData updates
  // useEffect(() => {
  //   if (userData) {
  //     console.log("User Data:::::::::::::::", userData);
  //     // Perform any action here that depends on userData being updated
  //   }
  // }, [userData]); // This effect depends on userData and runs whenever userData changes
  

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