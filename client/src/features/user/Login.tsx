import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { loginUser } from "./state/slice";
import '../forms.css';

const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const logMessage = useSelector((state: RootState) => state.user.logMessage);
    const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

    const handleLogin = async () => {
        setError(null);
        try {
            await dispatch(loginUser({ email, password })).unwrap();
            navigate('/habits')
        } catch (error: any) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (loggedIn) {
            navigate('/');
        }
    }, [loggedIn, navigate]);

    useEffect(() => {
        if (logMessage) {
            setError(null);
        }
    }, [logMessage]);

    return (
        <>
            <div className="form-container">
                <h2>Log in to your account</h2>
                <input className="form-input" onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email" value={email} />
                <input className="form-input" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" value={password} />
                <button className="form-button" onClick={handleLogin}>Login</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <h4>You don't have an account yet?</h4>
                <Link to='/user/register'>CREATE ACCOUNT</Link>
            </div>
        </>
    );
};

export default Login;
