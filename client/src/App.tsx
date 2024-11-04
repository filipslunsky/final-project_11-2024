import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './app/store.ts';
import ProtectedRoute from './features/user/ProtectedRoute.tsx';
import Navbar from './features/Navbar.tsx';
import Habits from './features/habits/Habits.tsx';
import User from './features/user/User.tsx';
import HabitDetail from './features/habits/HabitDetail.tsx';
import NewHabit from './features/habits/NewHabit.tsx';
import EditHabit from './features/habits/EditHabit.tsx';
import EditUser from './features/user/EditUser.tsx';
import Home from './features/user/Home.tsx';
import Login from './features/user/Login.tsx';
import Register from './features/user/Register.tsx';

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);
  
  return (
    <>
      <BrowserRouter>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/user/register' element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/habits' element={<Habits />} />
            <Route path='/habits/detail/:id' element={<HabitDetail />} />
            <Route path='/habits/new' element={<NewHabit />} />
            <Route path='/habits/edit/:id' element={<EditHabit />} />
            <Route path='/user' element={<User />} />
            <Route path='/user/edit' element={<EditUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
