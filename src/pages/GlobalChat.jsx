import ChatRoomNavbar from '../components/BarComponents/ChatRoomNavbar'
import MessageBar from '../components/BarComponents/MessageBar'
import LiveChats from '../components/GlobalChat/LiveChats'

const GlobalChat = ( ) => {
  return (
    <div className='h-screen w-full bg-white flex flex-col justify-between'>
        <ChatRoomNavbar username='Global Chat' />
        <LiveChats /> 
        <MessageBar  />
    </div>

  )
}

export default GlobalChat;