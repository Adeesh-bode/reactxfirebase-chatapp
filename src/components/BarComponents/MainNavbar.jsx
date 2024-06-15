import { useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { GoHomeFill } from "react-icons/go";
import { MdGroups } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { HiInboxArrowDown } from "react-icons/hi2";
import { BsThreeDots } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import { signOut } from "firebase/auth";
import { auth } from '../../utils/firebaseconfig';
import { useSnackbar } from 'notistack';
import { context } from '../../utils/context';
import Profile from '../../assets/user_dp.jpeg';
import { doc, updateDoc } from 'firebase/firestore'; 
import { db } from '../../utils/firebaseconfig';


const Navbar = () => {
  const { navigate, showNavbar, setShowNavbar, setDashboard, userData } = useContext(context);
  // const [ userId , setUserId ] = useState(userData?.uid); 
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          navigate("/");
          setShowNavbar(true);
        } else {
          setShowNavbar(false);
          console.log("User is not signed in");
        }
      } catch (error) {
        console.log(error.message)
      }
    })
  }, [])

  const handleSignOut = async () => {
    try {
      const userDocRef = doc(db, "users", userData.uid);
      await updateDoc(userDocRef, {
        status: false,
        lastactive: new Date().toLocaleString(), 
      });

      await signOut(auth);
      console.log('Signout Successful');
      showSnackbar('Signout Successful', 3000, 'success');
      navigate('/login');
    } catch (error) {
      console.log('Error in Signout:', error);
      showSnackbar('Some Error Occurred', 3000, 'error');
    }
  }

  if (showNavbar) {
    return (
      <div className='h-screen w-24 bg-black flex flex-col justify-between gap-2 items-center px-3 py-8 '>
        <div>
          <img src={userData?.profilepic || Profile} alt='user profile Image' className='h-12 w-12 rounded-full object-cover' onClick={() => navigate('/profile')} />
        </div>
        <div className='flex flex-col gap-5 '>
          <GoHomeFill className='text-white opacity-60 h-8 w-8 hover:opacity-100 ' onClick={() => {
            setDashboard(true);
            navigate('/');
          }} />
          <MdGroups className='text-white opacity-60 h-8 w-8  hover:opacity-100' onClick={() => navigate('/community')} />
          <FaTelegramPlane className='text-white opacity-60 h-8 w-8  hover:opacity-100' onClick={() => navigate('/globalchat')} />
          <HiInboxArrowDown className='text-white opacity-60 h-8 w-8  hover:opacity-100' onClick={() => navigate('/inbox')} />
          <IoSettingsSharp className='text-white opacity-60 h-8 w-8  hover:opacity-100' onClick={() => navigate('/setting')} />
          <BsThreeDots className='text-white opacity-60 h-8 w-8 hover:opacity-100 ' onClick={() => navigate('/')} />
        </div>
        <div>
          <FaPowerOff className='text-white opacity-60 h-8 w-8  hover:opacity-100' onClick={handleSignOut} />
        </div>
      </div>
    )
  }
}

export default Navbar;
