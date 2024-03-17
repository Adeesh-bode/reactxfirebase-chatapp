import React from 'react'
import ChatRoomNavbar from './ChatRoomNavbar'
import MessageBar from './MessageBar'
import Chats from './Chats'
import LiveChats from './LiveChats'

const ChatRoom = ( { user='LiveChat' , live=true }) => {
  return (
    <div className='h-screen w-full bg-white flex flex-col justify-between'>
        <ChatRoomNavbar username={user} />
        { live? <LiveChats /> : <Chats />}
        <MessageBar live={live} />
    </div>

  )
}

export default ChatRoom;