import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { logoutUser, deteleUser } from "./state/slice";
import './user.css';

const User: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
    
    const [delClicked, setDelClicked] = useState<boolean>(false);

    const email = user.user?.email;

    const handleLogout = async() => {
        dispatch(logoutUser());
        navigate('/');
    };

    const handleDelete = async() => {
        if (email) {
            const deleteItem = { email };
            dispatch(deteleUser(deleteItem));
            dispatch(logoutUser());
            navigate('/')
        }
        return;
    };

    const handleDecision = () => {
        setDelClicked(true);
    };

    const handleAbort = () => {
        setDelClicked(false);
    }

    return (
        <>
            <h2>User Info</h2>
            <div className="user-container">
                <p className="username">First Name: {user.user?.firstName}</p>
                <p className="username">Last Name: {user.user?.lastName}</p>
                <p className="email">Email address: {user.user?.email}</p>
                <Link className="edit" to='/user/edit'>edit user details</Link>
                <button className="logout" onClick={handleLogout}>logout</button>
            </div>
            {
                delClicked
                ?
                <div className="decision-container">
                    <h3 className="question">Are you sure you want to delete your account?</h3>
                    <button className="yes" onClick={handleDelete}>Yes, I am sure</button>
                    <button className="no" onClick={handleAbort}>No, I take it back</button>
                </div>
                :
                <button className="delete" onClick={handleDecision}>delete account</button>
            }
            
        </>
    );
}
 
export default User;