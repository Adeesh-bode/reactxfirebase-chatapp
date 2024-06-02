import UserHighlight from "../UserHighlight"

const SearchResult = ( { users }  ) => {
  console.log(users);
  return (
    <div className="users w-full flex flex-col gap-3 overflow-auto">
      {
        users.map((user)=>{
          return(
            <UserHighlight key={user.uid} username={user.username} status={ ( user.status)? 'online' : 'offline-ls'} uid={user.uid} />
            // <UserHighlight username={user.username} status={ ( user.status)? 'online' : 'offline-ls'} bio={ user.bio? user.bio : ''} />
          )
        })
      }
    </div>
  )
}

export default SearchResult;