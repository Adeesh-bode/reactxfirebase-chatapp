import ChatRoomNavbar from './ChatRoomNavbar'
import MessageBar from './MessageBar'
import Chats from './Chats'


const ChatRoom = (  ) => {
  return (
    <div className='h-screen w-full bg-white flex flex-col justify-between'>
        <ChatRoomNavbar username='Bi-chat' />
        <Chats />
        <MessageBar />
    </div>

  )
}

export default ChatRoom;