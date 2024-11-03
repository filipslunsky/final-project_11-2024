import React from "react";
import { Link } from 'react-router-dom';
// import { useState } from "react";

const Navbar: React.FC = () => {
    // const [logged, setLogged] = useState(false);
    return (
        // <>
        // {
        //     logged
        //     ?
        //     <div>
        //         <Link to={'/habits'}>Habits</Link>
        //         <Link to={'/user'}>John Doe</Link>
        //     </div>
        //     :
        //     <div>
        //         <Link to={'/login'}>Login</Link>
        //         <Link to={'/register'}>Register</Link>
        //         {/* testing button, remove */}
        //         <button onClick={() => {setLogged(true)}}>log</button>
        //     </div>
        // }
            
        // </>
        <>
            <div>
                <Link to={'/habits'}>Habits</Link>
                <Link to={'/user'}>John Doe</Link>
            </div>
        </>
    );
}
 
export default Navbar;