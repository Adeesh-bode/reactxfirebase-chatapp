import UserImg from '../../../assets/friend.jpg';
import { useContext } from 'react';
import { context } from '../../../utils/context';
const UserHighlight = ({ username ='GFG President' , status='online' ,uid , profilepic , bio="hello" }) => {
    const { setChatWith , setDashboard} = useContext(context);
    
    const toPersonalChat = ()=>{
        setChatWith(uid);
        setDashboard(false);

        console.log("CHAT WITH USER ID NOW CLICKED IN HIGHLIGHT: ", uid);
    }
    return (
    <div className='bg-white hover:bg-teal-300 border rounded-md w-full p-3 flex flex-col gap-2' onClick={toPersonalChat}>
        <div className=' flex justify-start  items-center gap-2'>
            <img src={ profilepic || UserImg} alt='user profile Image' className='h-14 w-14 mx-3 rounded-full object-cover'/>
            <div className=' flex flex-col '>
                        <div className='font-bold'>{ username }</div>
                <div className='text-gray-500'>{ (status)? 'online': 'offline' }</div>
            </div>
        </div>
        <div className=' w-full flex justify-center px-3 text-sm'>
            {/* <div > */}
                { bio }
            {/* </div> */}
            {/* <div className='text-white  bg-teal-500 rounded-full p-1 w-7 h-7 flex justify-center items-center'> 2 </div> */}
        </div>
    </div>
  )
}

export default UserHighlight