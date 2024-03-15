import React from 'react'

import Search from '../assets/search.gif';

import UserHighlight from './UserHighlight';

const Users = () => {
  return (
    <div className='h-screen w-1/3 bg-[#f7f5f5] flex flex-col gap-6 justify-start items-start px-6 py-8'>
        <div className='w-full flex justify-center items-center gap-2 rounded-md border border-gray-200 '>
            <img src={Search} alt='interactive search icon' />
            <input type='text' placeholder='Search User' name='search' className='outline-none  px-3 py-1 text-slate-700 border-none bg-transparent'></input>
        </div>
        <div className='users w-full flex flex-col gap-3 overflow-auto' >
            <UserHighlight />
            <UserHighlight />
            <UserHighlight />
            <UserHighlight />
            <UserHighlight />
        </div>
    </div>
  )
}

export default Users