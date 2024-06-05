import ChatRoomNavbar from '../components/GlobalChat/GlobalNavbar';
import MessageBar from '../components/GlobalChat/GlobalMessagebar';
import LiveChats from '../components/GlobalChat/LiveChats';

import { auth } from '../utils/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const GlobalChat = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserId = async () => {
      onAuthStateChanged(auth, async (user) => {
        try {
          if (user) {
            // console.log("User:||||||||||||||||||", user);
            setUser(user);
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

  // console.log("User:", user);
  // console.log("UserIDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD:", user?.uid);


  return (
    <div className='h-screen w-full bg-white flex flex-col justify-between'>
      <ChatRoomNavbar />
      <LiveChats userId={user?.uid} />
      <MessageBar userId={user?.uid} /> {/* Pass user data to MessageBar component */}
    </div>
  );
};

export default GlobalChat;
