
import { db } from '../../utils/firebaseconfig';    
import { doc } from 'firebase/firestore';    

import { onSnapshot } from 'firebase/firestore';  

import { useState , useEffect } from 'react';

const Chats = ({ userId}) => {
  console.log("44444444444444:",userId);
  const [ chats , setChats ] = useState([]);    

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "livechat","live"), (docSnapshot) => {    
      // const chatsArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); //.docs sed cause itterating in collection 
      // console.log("Snapshot:",docSnapshot);
      const chatsArray = docSnapshot.data();
      setChats( chatsArray.data || []);
    });
    console.log("CHATS ARRAY:",chats);
    return () => unsubscribe();
  }, []); 


  console.log("Chats:", chats);

  return (
    <div className='h-full w-full px-8 py-10 flex flex-col gap-3 overflow-auto'>
        {/* <div className='flex flex-col items-start'>
            <div className='bg-teal-400 w-fit p-3 rounded-md ' >
                <div className=''>hey alex what's Up?</div>
            </div>    
            <div className='text-xs'>Yesterday 2:00pm</div>
        </div>
        <div className='flex flex-col items-start'>
        <div className='bg-teal-400 w-fit p-3 rounded-md ' >
        <div className=''>As always Happy!!!</div>
        </div>    
        <div className='text-xs'>Today 8:01am</div>
      </div> */}
      { console.log("Chats:",chats)}
      {/* { console.log("Chats DATA:",chats.data)} */}
      {/* { console.log("uid:",user.uid)} */}
      { 
        chats.map((chat,index)=>{
          return(
            <div className={`flex flex-col ${ chat?.senderid === userId ? "items-end" : "items-start"} `} key={index}>
              <div className='bg-teal-400 w-fit p-3 rounded-md ' >
                  <div className=''>{ chat.message }</div>
              </div>    
              <div className='text-xs'>{ chat.senderusername }</div>
              <div className='text-xs'>Today 8:00am</div>
          </div>
        )
      }
        )
      }
          
    </div>
  )
}

export default Chats