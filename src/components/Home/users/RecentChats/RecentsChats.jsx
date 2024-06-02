import UserHighlight from '../UserHighlight';

const RecentsChats = () => {
  return (
    <div className='users w-full flex flex-col gap-3 overflow-auto' >
            <UserHighlight />
            <UserHighlight />
            {/* <UserHighlight />
            <UserHighlight />
            <UserHighlight /> */}
        </div>
  )
}

export default RecentsChats;