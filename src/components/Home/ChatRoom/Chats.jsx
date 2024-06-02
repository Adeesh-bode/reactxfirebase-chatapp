import { useEffect, useState, useRef } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../utils/firebaseconfig';

const Chats = ({ userId, chatWithId }) => {
  const [chats, setChats] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const code1 = userId + chatWithId;
    const code2 = chatWithId + userId;

    // Create a reference to the chat document
    let docRef1 = doc(db, "encryptedchats", code1);
    let docRef2 = doc(db, "encryptedchats", code2);

    // Set up a listener for real-time updates
    const unsubscribe1 = onSnapshot(docRef1, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setChats(data.message);
      }
    });

    const unsubscribe2 = onSnapshot(docRef2, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setChats(data.message);
      }
    });

    // Clean up the listener on component unmount
    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, [userId, chatWithId]);

  useEffect(() => {
    // Scroll to the bottom of the chat container when chats change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const formatTimestamp = (timestamp) => {
    if (timestamp?.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString(); // Adjust the format as needed
    }
    return "no-time";
  };

  return (
    <div ref={chatContainerRef} className='h-full w-full px-8 py-10 flex flex-col gap-3 overflow-auto'>
      {chats.map((chat, index) => (
        <div key={index} className={`flex flex-col ${chat.sender === userId ? "items-end" : "items-start"}`}>
          <div className='bg-teal-400 w-fit p-3 rounded-md'>
            <div>{chat.message}</div>
          </div>
          <div className='text-xs'>{formatTimestamp(chat.timestamp)}</div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
