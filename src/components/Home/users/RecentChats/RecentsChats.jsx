import { useEffect, useState, useContext } from 'react';
import UserHighlight from '../UserHighlight';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../utils/firebaseconfig';
import { context } from '../../../../utils/context';

const RecentChats = () => {
  const { userData } = useContext(context); // if userData is a prop/ state then we dont need use effects for recentChatswith but as userData change it should rerender the component
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentUsersData, setRecentUsersData] = useState([]);
  console.log(userData);


  useEffect(() => {
    if (userData?.RecentsChatsWith) {
      setRecentUsers(userData?.RecentsChatsWith);
      console.log(userData?.RecentsChatsWith);
    }
  },[userData]);

  useEffect(() => {
    console.log(recentUsers);
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
        <UserHighlight key={index} username={user?.username} uid={user?.uid} status={ user?.status } profilepic={ user?.profilepic } bio={ user?.bio}/>
      ))}
    </div>
  );
};

export default RecentChats;
