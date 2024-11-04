import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Navbar: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);
    return (
        <>
            <div>
                <Link to={'/habits'}>Habits</Link>
                <Link to={'/user'}>{user.firstName} {user.lastName}</Link>
            </div>
        </>
    );
}
 
export default Navbar;