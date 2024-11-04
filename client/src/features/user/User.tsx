import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { logoutUser, deteleUser } from "./state/slice";

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
            <p>First Name: {user.user?.firstName}</p>
            <p>Last Name: {user.user?.lastName}</p>
            <p>Email address: {user.user?.email}</p>
            <Link to='/user/edit'>Edit User details</Link>
            <br />
            <button onClick={handleLogout}>Logout</button>
            <br />
            {
                delClicked
                ?
                <div>
                    <h3>Are you sure you want to delete your account?</h3>
                    <button onClick={handleDelete}>Yes, I am sure</button>
                    <br />
                    <button onClick={handleAbort}>NO</button>
                </div>
                :
                <button onClick={handleDecision}>DELETE ACCOUNT</button>
            }
            
        </>
    );
}
 
export default User;