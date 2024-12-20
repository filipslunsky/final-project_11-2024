import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Logo from "./user/Logo";
import './navbar.css';

const Navbar: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    return (
        <>
        
                <div className="nav-container">
                    <Logo />
                    <div className="item-container">
                        <Link to={'/dashboard'} className="nav-item">Dashboard</Link>
                        <Link to={'/habits'} className="nav-item">Habits</Link>
                        <Link to={'/rewards'} className="nav-item">Rewards</Link>
                        <Link to={'/user'} className="nav-item">{user.user?.firstName} {user.user?.lastName}</Link>
                    </div>
                </div>
        </>
    );
}
 
export default Navbar;