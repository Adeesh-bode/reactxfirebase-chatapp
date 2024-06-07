import { useEffect, useState, useRef } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../utils/firebaseconfig';

const Chats = ({ userId, chatWithId }) => {
  const [chats, setChats] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Clear chats when userId or chatWithId changes
    setChats([]);

    const code1 = userId + chatWithId;
    const code2 = chatWithId + userId;

    // Create a reference to the chat documents
    const docRef1 = doc(db, "encryptedchats", code1);
    const docRef2 = doc(db, "encryptedchats", code2);

    const handleSnapshot = (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setChats(data.message);
      } else {
        setChats([]); // Clear chats if no data exists
      }
    };

    // Set up listeners for real-time updates
    const unsubscribe1 = onSnapshot(docRef1, handleSnapshot);
    const unsubscribe2 = onSnapshot(docRef2, handleSnapshot);

    // Cleanup listeners on component unmount or dependency change
    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, [userId, chatWithId]);

  useEffect(() => {
    // Scroll to the bottom of the chats
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const formatTimestamp = (timestamp) => {
    if (timestamp?.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString(); // Format the timestamp
    }
    return "no-time";
  };

  return (
    <div ref={chatContainerRef} className='h-full w-full px-8 py-10 flex flex-col gap-3 overflow-auto'>
      {chats.length > 0 ? (
        chats.map((chat, index) => (
          <div key={index} className={`flex flex-col ${chat.sender === userId ? "items-end" : "items-start"}`}>
            <div className='bg-teal-400 w-fit p-3 rounded-md'>
              <div>{chat.message}</div>
            </div>
            <div className='text-xs'>{formatTimestamp(chat.timestamp)}</div>
          </div>
        ))
      ) : (
        <div className='text-center text-gray-500'>No Conversations yet</div>
      )}
    </div>
  );
};

export default Chats;
