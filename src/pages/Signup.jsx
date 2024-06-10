import { useState, useEffect, useContext } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../utils/firebaseconfig'; // Combined imports
import { useSnackbar } from 'notistack';
import { doc, setDoc } from 'firebase/firestore';
import { context } from '../utils/context';
import { FaExternalLinkAlt } from "react-icons/fa";
import Connect from '../assets/connect.gif';
import axios from 'axios';

const Signup = () => {
  // const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [ region , setRegion ] = useState({ city:null , country:null , state:null});
  const { credentials, setCredentials, setUser, setShowNavbar } = useContext(context);
  const { enqueueSnackbar } = useSnackbar();
  const [passwordStrength, setPasswordStrength] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // setLocation({ latitude, longitude });
          fetchLocationInfo(latitude, longitude); // Fetch location info when coordinates are available
        },
        (err) => {
          console.log(err.message);
          window.alert(err.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      window.alert('Geolocation is not supported by this browser.');
    }
  }, []);

  const fetchLocationInfo = async (latitude, longitude) => {
    //todo setup .env and put key there
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=30110c1dad0a47ebb7268625516c4c0e&q=${latitude}+${longitude}&language=en&pretty=1`);
      if (response.data.results.length > 0) {
        const region = response.data.results[0].components;
        setRegion({
          city: region?.city,
          country:region?.country,
          state: region?.state,
        });
      }
    } catch (error) {
      console.error('Error fetching location information:', error , error.code);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    credentials.password.length < 6 ? setPasswordStrength(false) : setPasswordStrength(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setShowNavbar(true);
      enqueueSnackbar('Sign up Successful', {
        variant: 'success',
        autoHideDuration: 3000,
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
        dense: true,
      });

      const u = result?.user?.uid;
      await setDoc(doc(db, "users", u), {
        uid: u,
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
        status: true,
        RecentsChatsWith: [],
        lastactive: new Date().toLocaleString(),
        bio: "Hello!",
        phonenumber: null,
        profilepic: null,
        region:{
          state: region.state,
          country: region.country,
          city:region.city,
        }
      });
      console.log("Document successfully written!");
    } catch (error) {
      setShowNavbar(false);
      handleErrors(error);
    }
  };

  const handleErrors = (error) => {
    const errorMap = {
      'auth/network-request-failed': 'Check your internet connection',
      'auth/invalid-email': 'Not a valid E-mail',
      'auth/weak-password': 'Password should be at least 6 characters',
      'auth/email-already-in-use': 'Email already in use'
    };
    const errorMessage = errorMap[error.code] || 'An error occurred';
    enqueueSnackbar(errorMessage, {
      variant: 'error',
      autoHideDuration: 3000,
      anchorOrigin: { horizontal: 'center', vertical: 'top' },
      dense: true,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        setUser(user);
      } else {
        console.log("User is not signed in");
      }
    });
    return () => unsubscribe();
  }, [navigate, setUser]);

  return (
    <div className='bg-[#2d2a2a] w-screen h-screen flex justify-center items-center '>
      <div className='flex justify-around items-center bg-white gap-4 w-2/5 h-auto rounded-md'>
        <form onSubmit={handleSubmit} className='flex flex-col h-fit w-fit p-5 gap-4'>
          <div className='text-3xl text-center text-teal-500'>Sign Up</div>
          <input type='text' placeholder='username' name='username' onChange={handleChange} className='px-2 py-1 bg-transparent border'></input>
          <input type='text' placeholder='email' name='email' onChange={handleChange} className='px-2 py-1 bg-transparent border'></input>
          <div className='flex flex-col gap-1'>
            <input type='text' placeholder='password' name='password' onChange={handleChange} className='px-2 py-1 bg-transparent border'></input>
            {!passwordStrength && <div className='text-[10px] text-slate-700'>Password should be at least 6 characters</div>}
          </div>
          <input type='submit' className='bg-teal-600 text-white w-full py-1'></input>
          <div onClick={() => navigate('/login')} className='text-teal-400 flex justify-center gap-2 items-center cursor-pointer'>
            <FaExternalLinkAlt />
            Already have an account?
          </div>
        </form>
        <div className='w-fit h-fit flex flex-col justify-between items-center'>
          <div>Let&apos;s Connect</div>
          <img src={Connect} alt='interactive-img' />
          {region && <div>{region.city}, {region.state}, {region.country}</div>}
        </div>
      </div>
    </div>
  );
};

export default Signup;