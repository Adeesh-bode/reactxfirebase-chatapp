// todo: error on refresh
import { useContext, useState } from 'react';
import { context } from '../utils/context';
import { storage, db } from '../utils/firebaseconfig'; // Import your firebase configuration
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import avatar from "../assets/user_dp.jpeg";

const ProfilePage = () => {
  const { userData, setUserData } = useContext(context);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');



  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `profile_pics/${userData?.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);
    setSuccessMessage('');

    uploadTask.on(
      "state_changed",
      (snapshot) => {
      },
      (error) => {
        window.alert("Upload failed:");
        console.error("Upload failed:", error);
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          if (userData.profilepic) {
            const existingPicRef = ref(storage, userData.profilepic);
            await deleteObject(existingPicRef).catch((error) => {
              console.error("Error deleting old profile picture:", error);
            });
          }

          const userRef = doc(db, "users", userData.uid);
          await updateDoc(userRef, { profilepic: downloadURL });

          setUserData({ ...userData, profilepic: downloadURL });
          setUploading(false);
          setSuccessMessage('Profile picture updated successfully!');
        } catch (error) {
          console.error("Error updating profile picture:", error);
          setUploading(false);
        }
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105">
        <div className="flex justify-center p-6">
          <div className="rounded-full overflow-hidden h-32 w-32 flex justify-center items-center shadow-lg">
            <img src={(userData?.profilepic) ? userData?.profilepic : avatar} alt="User Avatar" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-2xl mb-2 text-gray-900">{userData?.username}</div>
          {/* <p className="text-gray-700 text-base">Status: {userData?.status ? "Active" : "Inactive"}</p> */}
          <p className="text-gray-700 text-base">Bio: {userData?.bio}</p>
          <p className="text-gray-700 text-base">Email: {userData?.email}</p>
          <p className="text-gray-700 text-base">Phone Number: {userData?.phoneNumber || "Not provided"}</p>
          <p className="text-gray-700 text-base">Region: {userData?.region.city}, {userData?.region.state}, {userData?.region.country}</p>
        </div>
        <div className="px-6 py-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Upload New Profile Picture
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
          {uploading && <p className="text-gray-700 text-base mt-2 animate-pulse">Uploading...</p>}
          {successMessage && <p className="text-green-500 text-base mt-2">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;