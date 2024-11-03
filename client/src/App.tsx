import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './features/Navbar';
import Habits from './features/habits/Habits';
import User from './features/users/User';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/habits" element={<Habits />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
