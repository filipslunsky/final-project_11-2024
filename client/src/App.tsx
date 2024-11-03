import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './features/Navbar.tsx';
import Habits from './features/habits/Habits.tsx';
import User from './features/users/User.tsx';
import HabitDetail from './features/habits/HabitDetail.tsx';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/habits' element={<Habits />} />
          <Route path='/habits/detail/:id' element={<HabitDetail />} />
          <Route path='/user' element={<User />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
