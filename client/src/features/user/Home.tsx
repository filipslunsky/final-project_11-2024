import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Home: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);
    return (
    <>
        <p>Start living your life better today.</p>
        <p>Keep track of your good habits you want to strengthen.</p>
        <p>Get rid of the bad ones effortlessly.</p>
        <p>Take back the control over your life day-by-day, one good thing at a time.</p>
        {
            !isLoggedIn
            ?
            <div>
                <h3>If you are new here, create an account and start today.</h3>
                <Link to='/user/register'>CREATE ACCOUNT</Link>
                <h3>Or you can log into your existing account.</h3>
                <Link to='/user/login'>LOGIN</Link>
            </div>
            :
            ''
        }
    </>
    );
}
 
export default Home;