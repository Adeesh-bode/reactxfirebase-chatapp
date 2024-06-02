import { useState } from 'react';
import { BsRobot } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey, how are you buddy?", sender: "bot" },
        { id: 2, text: "Hello, good", sender: "user" },
        { id: 3, text: "I need help, frame a message to my teacher for 1 day leave", sender: "bot" }
    ]);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = { id: messages.length + 1, text: message, sender: 'user' };
            setMessages([...messages, newMessage]);
            setMessage('');
        }
    };

    return (
        <div className='w-full max-w-md mx-auto bg-white rounded-lg shadow-lg flex flex-col'>
            <div className='w-full flex items-center bg-teal-500 p-4 rounded-t-lg text-white'>
                <BsRobot className='text-2xl mr-2' />
                <span>Your Buddy</span>
            </div>
            <div className="flex-1 p-4 overflow-auto">
                {messages.map((msg) => (
                    <div key={msg.id} className={`m-2 p-2 rounded ${msg.sender === 'user' ? 'bg-blue-400 text-white self-end' : 'bg-gray-200 self-start'}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className='flex items-center gap-2 p-2 bg-gray-50 rounded-b-lg'>
                <input 
                    type='text' 
                    placeholder='Type a message here' 
                    value={message} 
                    onChange={handleChange}
                    className='flex-1 outline-none px-3 py-1 text-gray-800 bg-transparent'
                />
                <button 
                    onClick={sendMessage} 
                    className='h-10 w-10 bg-teal-500 rounded-full flex justify-center items-center text-white'
                >
                    <FaTelegramPlane className='text-lg' />
                </button>
            </div>
        </div>
    )
}

export default ChatBot;
