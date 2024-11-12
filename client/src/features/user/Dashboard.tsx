import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { getHabits } from "../habits/state/slice";
import './dashboard.css';

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

    const allHabitsCompleted = habits.every(habit => habit.completed);

    const highestStreakMax = habits.length > 0 ? Math.max(...habits.map(habit => habit.max_streak)) : 0;

    const highestStreakCurrent = habits.length > 0 ? Math.max(...habits.map(habit => habit.current_streak)) : 0;

    return (
        <>
            <h2>Welcome back, {user?.firstName} {user?.lastName}</h2>
            <p>{currentDate}</p>
            <p className="motivation-phrase">Are you ready to take a few steps today to get your life better, {user?.firstName}?</p>
            <h3>{user?.firstName}'s Habits:</h3>
            <div className="habit-small-container">
                {
                    habits.map(habit => {
                        return (
                            <div className={`habit-small ${habit.completed ? 'done-mini' : 'undone-mini'}`} key={habit.habit_id}>
                                <p>{habit.name}</p>
                                <p>{habit.completed ? "done" : "undone"}</p>
                                <p>{habit.current_streak} {habit.frequency === 'daily' ? 'day' : 'week'}{habit.current_streak !== 1 ? 's' : ''}</p>
                            </div>
                        )
                    })
                }
            </div>
            <p className="motivation-phrase">{allHabitsCompleted ? `You are finished for now, way to go, ${user?.firstName}!` : `There is still work to be done, ${user?.firstName}, don't give up!`}</p>
            <h4>{user?.firstName}'s Streaks</h4>
            <p>All time longest streak: {highestStreakMax}</p>
            <p>Current longest streak: {highestStreakCurrent}</p>
            <p className="motivation-phrase">{highestStreakMax === highestStreakCurrent ? `You are about the make new personal best, ${user?.firstName}, nice going!` : `Keep going, ${user?.firstName} and you will beat your record again!`}</p>
        </>
    );
}
 
export default Dashboard;