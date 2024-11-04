import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store.ts";
import { useEffect } from "react";
import { getHabits, deleteHabit, resetDeleteHabitStatus } from './state/slice.ts';
import History from "../logs/History.tsx";
import { addLog, deleteLog } from "../logs/state/slice.ts";

const HabitDetail: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const habits = useSelector((state: RootState) => state.habits.habits);
    const { id } = useParams<{ id: string }>();
    const status = useSelector((state: RootState) => state.habits.deleteStatus);
    const navigate = useNavigate();
    const addLogStatus = useSelector((state: RootState) => state.logs.addLogStatus);
    const deleteLogStatus = useSelector((state: RootState) => state.logs.deleteLogStatus);

    useEffect(() => {
        dispatch(getHabits());
    }, [dispatch, addLogStatus, deleteLogStatus]);

    const habit = habits.find(habit => habit.habit_id === Number(id));

    const handleDelete = () => {
        const deleteItem = { habitId: Number(id) };
        dispatch(deleteHabit(deleteItem));
    };

    const getCurrentDate = (): string => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleCompleteHabit = (habitId: number) => {
        const date = getCurrentDate();
        const logItem = { habitId, date };
        dispatch(addLog(logItem));
    };

    const handleUncompleteHabit = (habitId: number) => {
        const date = getCurrentDate();
        const logItem = { habitId, date };
        dispatch(deleteLog(logItem));
    };

    useEffect(() => {
        if (status === 'success') {
            navigate('/habits');
            dispatch(resetDeleteHabitStatus());
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
                    {
                        !habit.completed
                        ?
                        <button onClick={() => handleCompleteHabit(Number(id))}>MARK AS COMPLETED</button>
                        :
                        <button onClick={() => handleUncompleteHabit(Number(id))}>MARK AS INCOMPLETE</button>
                    }
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