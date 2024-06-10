import FriendImg from '../../assets/friend.jpg';
import Phone from '../../assets/phone.gif';
import Video from '../../assets/video.gif';
import Menu from '../../assets/menu.gif';
import { useEffect, useContext, useState } from 'react';
import { context } from '../../utils/context';
import { countries, states, cities } from './data'; // Importing data from data.js

const ChatRoomNavbar = ({ userData }) => {
  const { region, setRegion } = useContext(context); 
  const [selectedCountry, setSelectedCountry] = useState(userData?.region?.country || '');
  const [selectedState, setSelectedState] = useState(userData?.region?.state || '');
  const [selectedCity, setSelectedCity] = useState(userData?.region?.city || '');

  useEffect(() => {
    setRegion({ state: selectedState.trim(), city: selectedCity.trim(), country: selectedCountry });
  }, [selectedCountry, selectedState, selectedCity, setRegion]);

  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setSelectedCountry(newCountry);
    setSelectedState('');
    setSelectedCity('');
  };

  const handleStateChange = (e) => {
    const newState = e.target.value.toLowerCase(); // Convert to lowercase
    setSelectedState(newState);
    setSelectedCity('');
  };
  
  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    setRegion({ state: selectedState.trim(), city: newCity.trim(), country: selectedCountry });
  };

  return (
    <div className='h-[90px] w-full border border-b-gray-300 px-3 flex justify-between items-center'>
      <div className='flex gap-2 items-center'>
        <img src={FriendImg} alt='friend-image' className='h-12 w-12 mx-3 rounded-full object-cover' />
        <div className='flex flex-col'>
          <div className='font-bold'>Global Chat</div>
          <div className='text-gray-500'>12 members Online</div>
        </div>
      </div>
      <div className='flex items-center justify-center gap-5'>
        <form className='flex flex-row gap-3'>
          <label htmlFor='country' className='flex items-center justify-center'>Country</label>
          <select
            id="country"
            className="border border-gray-300 rounded-md p-1"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="" disabled>Select Country</option>
            {Object.entries(countries).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>

          <label htmlFor='state' className='flex items-center justify-center'>State</label>
          <select
            id="state"
            className="border border-gray-300 rounded-md p-1"
            value={selectedState}
            onChange={handleStateChange}
            disabled={!selectedCountry}
          >
            <option value="" disabled>Select State</option>
            {selectedCountry && states[selectedCountry]?.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>

          <label htmlFor='city' className='flex items-center justify-center'>City</label>
          <select
            id="city"
            className="border border-gray-300 rounded-md p-1"
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedState}
          >
            <option value="" disabled>Select City</option>
            {selectedState && cities[selectedState]?.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </form>
        <img src={Phone} alt='phone-icon' className='h-8 w-8 mx-3' />
        <img src={Video} alt='video-icon' className='h-8 w-8 mx-3' />
        <img src={Menu} alt='menu-icon' className='h-8 w-8 mx-3' />
      </div>
    </div>
  );
}

export default ChatRoomNavbar;
