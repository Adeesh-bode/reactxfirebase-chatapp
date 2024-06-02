
import { useContext, useEffect, useState } from 'react';
import { context } from '../../../utils/context';
import { useNavigate } from 'react-router-dom';
import ChatRoomNavbar from './ChatRoomNavbar';
import MessageBar from './MessageBar';
import Chats from './Chats';

import { auth } from '../../../utils/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebaseconfig';

const ChatRoom = () => {
  const { chatWith } = useContext(context);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const [otherUser, setOtherUser] = useState({});

  useEffect(() => {
    const fetchUserId = async () => {
      onAuthStateChanged(auth, async (user) => {
        try {
          if (user) {
            console.log("User Id:", user.uid);
            setUserId(user.uid);
          } else {
            navigate("/login");
            console.log("User is not signed in");
          }
        } catch (error) {
          console.log(error.message);
        }
      });
    };

    fetchUserId();
  }, [navigate]);

  useEffect(() => {
    const fetchOtherUserData = async () => {
      try {
        const docRef = doc(db, "users", chatWith);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOtherUser(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (chatWith) {
      fetchOtherUserData();
    }
  }, [chatWith]);

  return (
    <div className='h-screen w-full bg-white flex flex-col justify-between'>
      {userId ? (
        <>
          <ChatRoomNavbar data={otherUser} />
          <Chats userId={userId} chatWithId={chatWith} />
          <MessageBar userId={userId} chatWithId={chatWith} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ChatRoom;
