import UserImg from '../../../assets/friend.jpg';
import { useContext } from 'react';
import { context } from '../../../utils/context';
const UserHighlight = ({ username ='GFG President' , status='online' ,uid }) => {
    const { setChatWith , setDashboard} = useContext(context);
    const toPersonalChat = ()=>{
        setChatWith(uid);
        setDashboard(false);

        console.log("CHAT WITH USER ID NOW CLICKED IN HIGHLIGHT: ", uid);
    }
    return (
    <div className='bg-white hover:bg-teal-300 border rounded-md w-full p-3' onClick={toPersonalChat}>
        <div className=' flex justify-start  items-center gap-2'>
            <img src={UserImg} alt='user profile Image' className='h-14 w-14 mx-3 rounded-full object-cover'/>
            <div className=' flex flex-col '>
                        <div className='font-bold'>{ username }</div>
                <div className='text-gray-500'>{ status }</div>
            </div>
        </div>
        <div className=' flex justify-around gap-3 px-3'>
            <div>
                Next Event ki planning ...   
            </div>
            <div className='text-white  bg-teal-500 rounded-full p-1 w-7 h-7 flex justify-center items-center'> 2 </div>
        </div>
    </div>
  )
}

export default UserHighlight