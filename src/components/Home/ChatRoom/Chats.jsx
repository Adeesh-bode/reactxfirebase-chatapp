import { useEffect , useState } from 'react';     
import { db } from '../../../utils/firebaseconfig';    
import { collection } from 'firebase/firestore';    
import { onSnapshot } from 'firebase/firestore';  

const Chats = () => {
  const [ chats , setChats ] = useState([]);    

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "livechat"), (querySnapshot) => {    
      const chatsArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setChats(chatsArray);
    });

    return () => unsubscribe();
  }, []); 

  // console.log("Chats:", chats);

  return (
    <div className='h-full w-full px-8 py-10 flex flex-col gap-3 overflow-auto'>
        <div className='flex flex-col items-start'>
            <div className='bg-teal-400 w-fit p-3 rounded-md ' >
                <div className=''>hey alex what&apos;s Up?</div>
            </div>    
            <div className='text-xs'>Yesterday 2:00pm</div>
        </div>
        <div className='flex flex-col items-end'>
            <div className='bg-teal-400 w-fit p-3 rounded-md ' >
                <div className=''>I am fine. How are you?</div>
            </div>    
            <div className='text-xs'>Today 8:00am</div>
        </div>
        <div className='flex flex-col items-start'>
            <div className='bg-teal-400 w-fit p-3 rounded-md ' >
                <div className=''>As always Happy!!!</div>
            </div>    
            <div className='text-xs'>Today 8:01am</div>
        </div>
          
    </div>
  )
}

export default Chats;