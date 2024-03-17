import React from 'react'
import ChatRoomNavbar from './ChatRoomNavbar'
import MessageBar from './MessageBar'
import Chats from './Chats'

const ChatRoom = ( { user='LiveChat' }) => {
  return (
    <div className='h-screen w-full bg-white flex flex-col justify-between'>
        <ChatRoomNavbar username={user} />
        <Chats />
        <MessageBar />
    </div>

  )
}

export default ChatRoom;