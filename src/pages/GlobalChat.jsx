import ChatRoomNavbar from '../components/GlobalChat/GlobalNavbar';
import MessageBar from '../components/GlobalChat/GlobalMessagebar';
import LiveChats from '../components/GlobalChat/LiveChats';

import { auth, db } from '../utils/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

const GlobalChat = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({}); 

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", user?.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (user?.uid) {
      fetchUserData();
    }
  }, [user]);

  return (
    <div className='h-screen w-full bg-white flex flex-col justify-between'>
      <ChatRoomNavbar userData={userData} />
      <LiveChats userId={user?.uid} />
      <MessageBar userId={user?.uid} userData={userData} />
    </div>
  );
};

export default GlobalChat;
