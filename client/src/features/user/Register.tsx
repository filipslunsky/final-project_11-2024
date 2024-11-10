import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { registerUser, resetRegisterStatus } from "./state/slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import '../forms.css';

const Register: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();
    const registerStatus = useSelector((state: RootState) => state.user.registerStatus);

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
        if (registerStatus === 'success') {
            setSuccess(true);
            dispatch(resetRegisterStatus());
        }
    }, [registerStatus, dispatch]);

    const handleClick = () => {
        if (firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0 || password !== passwordCheck) {
            return;
        } else {
            const newUser = {firstName, lastName, email, password};
            dispatch(registerUser(newUser));
        }
    };

    return (
        <>
            {
                success
                ?
                <div>
                    <h2>Your account was successfully created. You may now log in.</h2>
                    <Link to='/user/login'>LOGIN</Link>
                </div>
                :
                <div className="form-container">
                    <h2>Register</h2>
                    <input className="form-input" onChange={(e) => {setFirstName(e.target.value)}} type="text" placeholder="first name" required />
                    <input className="form-input" onChange={(e) => {setLastName(e.target.value)}} type="text" placeholder="last name" required />
                    <input className="form-input" onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="email address" required />
                    <input className="form-input" onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="choose your password" required />
                    <input className="form-input" onChange={(e) => {setPasswordCheck(e.target.value)}} type="password" placeholder="repeat your password" required />
                    <p>{passwordMessage}</p>
                    <button className="form-button" onClick={handleClick}>register</button>
                    <Link className="form-link" to='/'>cancel</Link>
                </div>
            }
        </>
    );
}
 
export default Register;