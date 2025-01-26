import { useEffect, useContext } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../utils/firebaseconfig';
import useCustomSnackbar from '../utils/notistack';
import Connect from '../assets/connect.gif';
import { context } from '../utils/context';
import { FaExternalLinkAlt } from "react-icons/fa";

const Login = () => {
  const { credentials, setCredentials, setShowNavbar } = useContext(context);
  const showSnackbar = useCustomSnackbar();
  const navigate = useNavigate();

  // window.alert("Can Use Testing Credentials : email -- luffy@gmail.com | 123456")

  const handleChange = (e) => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log("Successfully Logged In");
        setShowNavbar(true);
        showSnackbar('Log in Successful', 3000, 'success');
      })
      .catch((error) => {
        setShowNavbar(false);
        if (error.code === "auth/invalid-credential" || error.code === "auth/invalid-email") {
          showSnackbar('Incorrect E-mail or Password', 3000, 'failure');
        } else if (error.code === 'auth/network-request-failed') {
          showSnackbar('Check Your Network Connection', 3000, 'success');
        }
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      try {
        if (currentUser) {
          navigate("/");
        } else {
          console.log("User is not signed in");
        }
      } catch (error) {
        console.log(error.message);
      }
    });
  }, [navigate]);

  return (
    <div className='bg-[#2d2a2a] w-screen h-screen flex justify-center items-center'>
      <div className='flex justify-around items-center bg-white gap-4 w-2/5 h-1/2 rounded-md'>
        <form onSubmit={handleSubmit} className='flex flex-col h-fit w-fit p-5 gap-4'>
          <div className='text-3xl text-center text-teal-500'>Login</div>
          <input type='text' placeholder='Email' name='email' onChange={handleChange} className='px-2 py-1 bg-transparent border' />
          <input type='password' placeholder='Password' name='password' onChange={handleChange} className='px-2 py-1 bg-transparent border' />
          <input type='submit' className='bg-teal-600 text-white w-full py-1' />
          <div className='flex justify-between w-full'>
            <div onClick={() => navigate('/signup')} className='text-teal-400 flex justify-center gap-2 items-center cursor-pointer'>
              <FaExternalLinkAlt />
              Don&apos;t have an account?
            </div>
          </div>
        </form>
        <div className='w-fit h-fit flex flex-col justify-between items-center'>
          <div>Let&apos;s Connect</div>
          <img src={Connect} alt='interactive-img' />
        </div>
      </div>
    </div>
  );
};

export default Login;