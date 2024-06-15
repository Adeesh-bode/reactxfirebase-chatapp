import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebaseconfig';
import { useNavigate } from 'react-router-dom';


import ChatRoom from '../components/Home/ChatRoom/ChatRoom';
import Users from '../components/Home/users/Users';


import DashboardSection from '../components/Home/Dashboard/Dashboard';
import { useContext } from 'react';
import { context } from '../utils/context';



const Home = () => {
  const { dashboard , user } = useContext(context);

  const navigate = useNavigate();



  useEffect(()=>{
    onAuthStateChanged( auth, (user)=>{
      try{
        if(user){
          // navigate("/");
          // const uid = user.uid;
          // console.log(uid);
          // fetchData();
        }
        else{
          navigate("/login");
          console.log("User is not signed in");
        }
      }
      catch(error){
        console.log(error.message)
      }
    })
  },[]);

  return (
    <div className='w-full flex '>
      <Users />
      {
        dashboard? <DashboardSection /> : <ChatRoom />
      }
    </div>
  )
}

export default Home;