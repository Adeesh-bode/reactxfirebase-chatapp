
import FriendImg from '../../assets/friend.jpg'

import Phone from '../../assets/phone.gif';
import Video from '../../assets/video.gif';
import Menu from '../../assets/menu.gif';
import { useEffect , useContext} from 'react';
import { context } from '../../utils/context';
const regions = {
  india: 'India',
  usa: 'United States',
  canada: 'Canada',
  australia: 'Australia',
  uk: 'United Kingdom',
  germany: 'Germany',
  france: 'France',
  japan: 'Japan',
  china: 'China',
  brazil: 'Brazil'
};

const ChatRoomNavbar = ( { userData }) => {
  const { region, setRegion } = useContext(context); 

  useEffect
  return (
    <div className='h-[90px] w-full border border-b-gray-300 px-3  flex justify-between items-center'>
        <div className=' flex gap-2 items-center'>
            <img src={FriendImg} alt='friend-image' className='h-12 w-12 mx-3 rounded-full object-cover ' />
            <div className=' flex flex-col '>
                <div className='font-bold'>Global Chat</div>
                <div className='text-gray-500'>xyz members Online</div>
            </div>
        </div>
        <div className='flex items-center justify-center gap-5'>
        <form className='flex flex-row gap-3'>
            <label htmlFor='region' className='flex items-center justify-center'>Region</label>
            <select id="region" placeholder="select region" className="border border-gray-300 rounded-md p-1  " >
              {Object.entries(regions).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
        </form>
            <img src={Phone} alt='phone -icon' className='h-8 w-8 mx-3 ' />
            <img src={Video} alt='phone -icon' className='h-8 w-8 mx-3 ' />
            <img src={Menu} alt='phone -icon' className='h-8 w-8 mx-3 ' />
        </div>
    </div>
  )
}

export default ChatRoomNavbar