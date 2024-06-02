import { createContext , useState }  from 'react';

import { useNavigate } from 'react-router-dom';

export const context = createContext();
const AppContext = ({ children}) =>{

    // const coll = collection(db, 'users');
    // console.log(coll);

    // const docRef = getDoc(coll);
    // console.log(docRef);
    const [ chatWith , setChatWith ] = useState('');
    const [ showNavbar , setShowNavbar ] = useState(false);
    const [ user , setUser ] = useState();
    const [ dashboard , setDashboard] = useState(true);

    const [ credentials , setCredentials ] = useState({
        email: "",
        password:"",
        username:"",
        uid:"",
        status: false,
        bio:"Hello!",
        phonenumber: null,
        lastactive: null,
      }) 

      const navigate = useNavigate();

    return(
        <context.Provider value={{ 
            credentials, setCredentials,
            navigate,
            user, setUser,
            dashboard , setDashboard,
            showNavbar , setShowNavbar,
            chatWith, setChatWith
            }}>
            {children}
        </context.Provider>
    )
}

export default AppContext;