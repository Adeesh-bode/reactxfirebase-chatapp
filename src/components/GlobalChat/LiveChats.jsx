import { db } from '../../utils/firebaseconfig';    
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';  
import { useState, useEffect, useRef, useContext } from 'react';
import { context } from '../../utils/context';

const Chats = ({ userId }) => {
  const { region } = useContext(context); 
  const [chats, setChats] = useState([]);   
  const globalchatsRef = useRef(null); 

  useEffect(() => {
    if (!region || !region.country || !region.state || !region.city) {
      console.log('Region data is not fully available:', region);
      return;
    }

    const stringCode = `${region.country}${region.state}${region.city}`;
    console.log(`Subscribing to document: livechat/${stringCode}`);

    const ensureDocumentExists = async () => {
      const docRef = doc(db, "livechat", stringCode);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        console.log(`Document livechat/${stringCode} does not exist, creating it.`);
        await setDoc(docRef, { chats: [] });
      }

      const unsubscribe = onSnapshot(docRef, (docSnapshot) => {    
        if (docSnapshot.exists()) { 
          console.log(`Document livechat/${stringCode} data:`, docSnapshot.data());
          setChats(docSnapshot.data().chats || []);    
        }
      });

      return unsubscribe;
    };

    const unsubscribePromise = ensureDocumentExists();

    return () => {
      unsubscribePromise.then(unsubscribe => {
        if (unsubscribe) {
          unsubscribe();
        }
      });
    };
  }, [region]);

  useEffect(() => {
    if (globalchatsRef.current) {
      globalchatsRef.current.scrollTop = globalchatsRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div ref={globalchatsRef} className='h-full w-full px-8 py-10 flex flex-col gap-3 overflow-auto'>
      {chats.map((chat, index) => (
        <div className={`flex flex-col ${chat?.senderid === userId ? "items-end" : "items-start"}`} key={index}>
          <div className='bg-teal-400 w-fit p-3 rounded-md'>
            <div className=''>{chat.message}</div>
          </div>    
          <div className='text-xs'>{chat.senderusername}</div>
          <div className='text-xs'>Today 8:00am</div>
        </div>
      ))}
    </div>
  );
}

export default Chats;
