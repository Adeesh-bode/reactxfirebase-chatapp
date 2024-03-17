import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import ChatRoom from './components/ChatRoom';
import './index.css';

import AppContext from './utils/context';


function App() {
  // const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
      <AppContext>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="/chatroom" element={<ChatRoom />} />
      </Routes>
      </AppContext>
    </BrowserRouter>
  )
}

export default App;
