import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { logoutUser } from "./state/slice";

const User: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);

    const handleLogout = async() => {
        dispatch(logoutUser());
        navigate('/');
    };

    return (
        <>
            <h2>User Info</h2>
            <p>First Name: {user.user?.firstName}</p>
            <p>Last Name: {user.user?.lastName}</p>
            <p>Email address: {user.user?.email}</p>
            <Link to='/user/edit'>Edit User details</Link>
            <br />
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}
 
export default User;