import ChatRoomNavbar from '../../BarComponents/ChatRoomNavbar'
import MessageBar from '../../BarComponents/MessageBar'
import Chats from './Chats';

import { useContext, useEffect , useState } from 'react';
import { context } from '../../../utils/context';
import { where , doc , getDoc} from 'firebase/firestore';
import { db } from '../../../utils/firebaseconfig';

const ChatRoom = () => {
  const { user ,chatWith } = useContext(context);
  // const [ chatCode , setChatCode] =useState('');
  // const [ otherUser , setOtherUser ] =useState({});

  useEffect(()=>{
    console.log("MY USER:::", user);
    console.log("MY USER:::", user);
    console.log("MY USERIdDD:::", user?.uid);
    console.log("MY USERIDD:::", user?.uid);
    console.log("CHATWITHID:::", chatWith);
    console.log("CHATWITHID:::", chatWith);
    // console.log("MY USERIDD:::", user?.uid);
    // setChatCode(chatWith+user?.uid);   
                                      // Remember format of doc name  uid's  ka cmbination ( 2possibilities ) // 
    // try{
    //   const docRef = doc(db,'users',chatWith); 
    //   const data = getDoc(docRef); 
    //   if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    //   } else {
    //     console.log("No such document!");
        
    //   }
      
    // }
    // console.log("Person Data::::::\n",data);
    // console.log("Person Data::::::\n",data);
    // console.log("Person Data::::::\n",data);
    // console.log("Person Data::::::\n",data);
    // setOtherUser(data);
  },[])
  
  
  
  return (
    <div className='h-screen w-full bg-white flex flex-col justify-between'>
        <ChatRoomNavbar username="otherUser.username" />
        <Chats code="chatCode" />
        <MessageBar />
    </div>
  )
}

export default ChatRoom;