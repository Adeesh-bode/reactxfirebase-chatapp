import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/BarComponents/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import GlobalChat from './pages/GlobalChat';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Setting from './pages/Setting';
import './index.css';

import AppContext from './utils/context';

function App() {
  return (
    <BrowserRouter>
      <AppContext>
        <div className="flex flex-shrink-0 flex-grow-1">
        {/* <div className="flex flex-shrink-0 flex-grow-1 items-center"> for floating navbar */}
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />
              <Route path="/globalchat" element={<GlobalChat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/community" element={<Community />} />
              <Route path="/setting" element={<Setting />} />
            </Routes>
          </div>
        </div>
      </AppContext>
    </BrowserRouter>
  )
}

export default App;
