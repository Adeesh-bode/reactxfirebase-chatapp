import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHighlight from '../UserHighlight';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../../utils/firebaseconfig';

const RecentChats = () => {
  const navigate = useNavigate();
  const [recentUsers, setRecentUsers] = useState([]);
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState('');
  const [recentUsersData, setRecentUsersData] = useState([]);

  // Fetching user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserData();
  }, [userId]);

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
    if (userData?.RecentChatsWith) {
      setRecentUsers(userData.RecentChatsWith);
    }
  }, [userData]);

  useEffect(() => {
    const fetchRecentUsersData = async () => {
      try {
        const usersData = [];
        const uniqueRecentUsers = [...new Set(recentUsers)];
        
        for (let i = 0; i < uniqueRecentUsers.length; i++) {
          const docRef = doc(db, "users", uniqueRecentUsers[i]);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            usersData.push(docSnap.data());
          } else {
            console.log("No such document!");
          }
        }

        console.log("Recent Users Data: ", usersData);
        setRecentUsersData(usersData);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (recentUsers?.length > 0) {
      fetchRecentUsersData();
    }
  }, [recentUsers]);

  return (
    <div className='users w-full flex flex-col gap-3 overflow-auto'>
      {recentUsersData.map((user, index) => (
        <UserHighlight key={index} username={user?.username} uid={user?.uid} profilepic={ user?.profilepic }/>
      ))}
    </div>
  );
};

export default RecentChats;
