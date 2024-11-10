import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { editUser, resetEditStatus } from "./state/slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import '../forms.css';

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
            <div className="form-container">
                <h2>Your user information was successfully updated.</h2>
                <Link className="form-link" to='/user'>Go back</Link>
            </div>
            :
            <div className="form-container">
                <h2>Update User Information</h2>
                <h4>{user?.firstName} {user?.lastName}</h4>
                <input className="form-input" onChange={(e) => {setFirstName(e.target.value)}} type="text" placeholder="first name" />
                <input className="form-input" onChange={(e) => {setLastName(e.target.value)}} type="text" placeholder="last name" />
                <input className="form-input" onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="choose new password" />
                <input className="form-input" onChange={(e) => {setPasswordCheck(e.target.value)}} type="password" placeholder="repeat new password" />
                <p>{passwordMessage}</p>
                <button className="form-button" onClick={handleClick}>SAVE</button>
                <Link className="form-link" to='/user'>cancel</Link>
            </div>
        }
        </>
    );
}
 
export default EditUser;