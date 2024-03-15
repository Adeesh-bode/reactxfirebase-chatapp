import React from 'react'
import ChatRoomNavbar from './ChatRoomNavbar'
import MessageBar from './MessageBar'

const ChatRoom = () => {
  return (
    <div className='h-screen w-full bg-white flex flex-col justify-between'>
        <ChatRoomNavbar />
        <MessageBar />
    </div>

  )
}

export default ChatRoom