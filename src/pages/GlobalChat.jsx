import ChatRoomNavbar from '../components/GlobalChat/GlobalNavbar'
import MessageBar from '../components/GlobalChat/GlobalMessagebar'
import LiveChats from '../components/GlobalChat/LiveChats'

const GlobalChat = ( ) => {
  return (
    <div className='h-screen w-full bg-white flex flex-col justify-between'>
        <ChatRoomNavbar/>
        <LiveChats /> 
        <MessageBar  />
    </div>

  )
}

export default GlobalChat;