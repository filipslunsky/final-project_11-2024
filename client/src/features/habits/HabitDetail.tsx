import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store.ts";
import { useEffect } from "react";
import { getHabits, deleteHabit, resetDeleteStatus } from './state/slice.ts';
import History from "../logs/History.tsx";

const HabitDetail: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const habits = useSelector((state: RootState) => state.habits.habits);
    const { id } = useParams<{ id: string }>();
    const status = useSelector((state: RootState) => state.habits.deleteStatus);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getHabits());
    }, [dispatch]);

    const habit = habits.find(habit => habit.habit_id === Number(id));

    const handleDelete = () => {
        const deleteItem = { habitId: Number(id) };
        dispatch(deleteHabit(deleteItem));
    };

    useEffect(() => {
        if (status === 'success') {
            navigate('/habits');
            dispatch(resetDeleteStatus());
        }
    }, [status, navigate, dispatch]);

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
            <Link to={`/habits/edit/${id}`}>EDIT HABIT</Link>
            <br />
            <button onClick={handleDelete}>DELETE HABIT</button>
            <br />
            <Link to="/habits">Back to Habits</Link>
        </>
    );
}
 
export default HabitDetail;