import Search from '../../../assets/search.gif';
import RecentChats from './RecentChats/RecentsChats';
import SearchResult from './SearchResult/SearchResult';
import { useState, useEffect } from 'react';
import { query, collection, onSnapshot, where } from 'firebase/firestore';
import { db } from '../../../utils/firebaseconfig';

const Users = () => {
  const [inputUser, setInputUser] = useState("");
  const [showRecent, setShowRecent] = useState(true);
  const [resultUsers, setResultUsers] = useState([]);

  useEffect(() => {
    const fetchUserByInput = async () => {
      if (inputUser === "") {
        // setShowRecent(true);
        setResultUsers([]); // earlier I set it to get all user in empty string , which will be unncessary overhead when large users dataset
        return;
      }
      
      const start = inputUser;
      const end = inputUser + '\uf8ff';

      const q = query(
        collection(db, 'users'),
        where("username", ">=", start),
        where("username", "<=", end)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setResultUsers(users);
      });

      return () => unsubscribe();
    };

    fetchUserByInput();
  }, [inputUser]);

  return (
    <div className='h-screen w-1/3 bg-[#f7f5f5] flex flex-col gap-6 justify-start items-start px-6 py-8'>
      <div className='w-full flex justify-center items-center gap-2 rounded-md border border-gray-200'>
        <img src={Search} alt='interactive search icon' />
        <input 
          type='text' 
          placeholder='Search User' 
          name='search' 
          onChange={(e) => setInputUser(e.target.value)} 
          onFocus={() => setShowRecent(false)}
          className='outline-none px-3 py-1 text-slate-700 border-none bg-transparent' 
        />
      </div>
      <div className='text-2xl px-3'>
        {showRecent ? "Recent Chats" : "Searched Users"}
      </div>
      <div className='users w-full flex flex-col gap-3 overflow-auto'>
        {showRecent ? <RecentChats /> : (resultUsers.length === 0 ? "No Users Found" : <SearchResult users={resultUsers} />)}
      </div>
    </div>
  );
}

export default Users;

