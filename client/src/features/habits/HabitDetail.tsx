import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store.ts";
import { useEffect } from "react";
import { getHabits } from './state/slice.ts';
import History from "../logs/History.tsx";

const HabitDetail: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const habits = useSelector((state: RootState) => state.habits.habits);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(getHabits());
    }, [dispatch]);

    const habit = habits.find(habit => habit.habit_id === Number(id));

    return (
        <>
            {habit ? (
                <div>
                    <h2>{habit.name}</h2>
                    <p>Category: {habit.category}</p>
                    <p>Frequency: {habit.frequency}</p>
                    <p>Current Streak: {habit.current_streak}</p>
                    <p>Max Streak: {habit.max_streak}</p>
                    <p>Completed: {habit.completed ? "Yes" : "No"}</p>
                    <History habitId={habit.habit_id} />
                </div>
            ) : (
                <p>Habit not found.</p>
            )}
            <Link to="/habits">Back to Habits</Link>
        </>
    );
}
 
export default HabitDetail;