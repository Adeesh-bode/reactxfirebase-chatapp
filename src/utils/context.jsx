import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../utils/firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const context = createContext();

const AppContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null); 
  const [showNavbar, setShowNavbar] = useState(false);
  const [chatWith, setChatWith] = useState('');
  const [dashboard, setDashboard] = useState(true);
  const [region, setRegion] = useState(null); 
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setUser(user);
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setRegion({ city: data.region.city, country: data.region.country, state: data.region.state });
          } else {
            console.log('No such document!');
          }
        } else {
          setUser(null);
          setUserData(null);
          setRegion(null);
          setShowNavbar(false);
          // navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const contextValue = {
    navigate,
    user,
    setUser,
    dashboard,
    setDashboard,
    showNavbar,
    setShowNavbar,
    chatWith,
    setChatWith,
    userData, 
    region,
    setRegion,
    credentials,
    setCredentials,
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export default AppContext;
