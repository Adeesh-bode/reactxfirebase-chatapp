import { createContext , useState }  from 'react';

import { useNavigate } from 'react-router-dom';


import { getDoc } from 'firebase/firestore';

import { collection } from 'firebase/firestore';


export const context = createContext();
const AppContext = ({ children}) =>{

    // const coll = collection(db, 'users');
    // console.log(coll);

    // const docRef = getDoc(coll);
    // console.log(docRef);



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
            
            }}>
            {children}
        </context.Provider>
    )
}

export default AppContext;