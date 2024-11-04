import React from "react";
import { Link } from "react-router-dom";

const User: React.FC = () => {
    return (
        <>
            <h2>User Info</h2>
            <p>First Name: John</p>
            <p>Last Name: Doe</p>
            <p>Email address: john@gmail.com</p>
            <Link to='/user/edit'>Edit User details</Link>
            <br />
            <button>Logout</button>
        </>
    );
}
 
export default User;