import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { logoutUser, deteleUser } from "./state/slice";

const User: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
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
            <button onClick={handleDelete}>DELETE ACCOUNT</button>
        </>
    );
}
 
export default User;