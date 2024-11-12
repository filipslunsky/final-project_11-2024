import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { getHabits } from "../habits/state/slice";

const Dashboard: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch<AppDispatch>();
    const habits = useSelector((state: RootState) => state.habits.habits);
    
    useEffect(() => {
        dispatch(getHabits());
        console.log(habits);
    }, [dispatch]);

    const getCurrentDate = (): string => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    };

    const currentDate = getCurrentDate();



    return (
        <>
            <h2>Welcome back, {user?.firstName} {user?.lastName}</h2>
            <p>{currentDate}</p>
            <p>Are you ready to take a few steps today to get your life better?</p>
        </>
    );
}
 
export default Dashboard;