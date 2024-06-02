import avatar from "../assets/user_dp.jpeg" ;

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <div className="rounded-full overflow-hidden">
        <img src={avatar} className="w-full object-cover" />
      </div>
      <h1>user.username</h1>
      <p>Status: user.status</p>
      <p>Bio: user.bio</p>
      <p>Email: user.email</p>
      <p>Phone Number: user.phoneNumber</p>
    </div>
  );
};

export default ProfilePage;
