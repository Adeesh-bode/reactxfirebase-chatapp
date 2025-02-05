import UserHighlight from "../UserHighlight";

const SearchResult = ({ users }) => {
  return (
    <div className="users w-full flex flex-col gap-3 overflow-auto">
      {users.map((user) => (
        <UserHighlight key={user.uid} username={user.username} profilepic={ user?.profilepic } bio={ user?.bio} status={user.status ? 'online' : 'offline-ls'} uid={user.uid} />
      ))}
    </div>
  );
}

export default SearchResult;
