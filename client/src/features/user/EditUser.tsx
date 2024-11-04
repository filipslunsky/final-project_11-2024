import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { editUser, resetEditStatus } from "./state/slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";

const EditUser: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const user = useSelector((state: RootState) => state.user.user);
    const email = user?.email;
    const dispatch = useDispatch<AppDispatch>();
    const editStatus = useSelector((state: RootState) => state.user.editStatus);

    const checkPasswordMatch = () => {
        if (password.length === 0) {
            setPasswordMessage('')
        } else if (password === passwordCheck) {
            setPasswordMessage('both passwords match')
        } else {
            setPasswordMessage('passwords do not match')
        }
    };

    useEffect(() => {
        checkPasswordMatch()
    }, [password, passwordCheck]);

    useEffect(() => {
        if (editStatus === 'success') {
            setSuccess(true);
            dispatch(resetEditStatus());
        }
    }, [editStatus, dispatch]);

    const handleClick = () => {
        if (firstName.length === 0 || lastName.length === 0 || password.length === 0 || password !== passwordCheck) {
            return;
        } else {
            const editItem = {firstName, lastName, email, password};
            dispatch(editUser(editItem));
        }
    };

    return (
        <>
        {
            success
            ?
            <div>
                <h2>Your user information was successfully updated.</h2>
                <Link to='/user'>Go back</Link>
            </div>
            :
            <div>
                <h2>Update User Information</h2>
                <h4>{user?.firstName} {user?.lastName}</h4>
                <input onChange={(e) => {setFirstName(e.target.value)}} type="text" placeholder="first name" />
                <br />
                <input onChange={(e) => {setLastName(e.target.value)}} type="text" placeholder="last name" />
                <br />
                <input onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="choose new password" />
                <br />
                <input onChange={(e) => {setPasswordCheck(e.target.value)}} type="password" placeholder="repeat new password" />
                <br />
                <p>{passwordMessage}</p>
                <button onClick={handleClick}>SAVE</button>
                <br />
                <Link to='/user'>cancel</Link>
            </div>
        }
        </>
    );
}
 
export default EditUser;