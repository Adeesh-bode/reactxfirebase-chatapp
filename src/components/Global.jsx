import ChatRoomNavbar from './ChatRoomNavbar'
import MessageBar from './MessageBar'
import LiveChats from './LiveChats'

const Global = ( ) => {
  return (
    <div className='h-screen w-full bg-white flex flex-col justify-between'>
        <ChatRoomNavbar username='Global Chat' />
        <LiveChats /> 
        <MessageBar  />
    </div>

  )
}

export default Global;