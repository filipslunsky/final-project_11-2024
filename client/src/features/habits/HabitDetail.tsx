import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store.ts";
import { getHabits, deleteHabit, resetDeleteHabitStatus } from './state/slice.ts';
import History from "../habitLogs/History.tsx";
import { addLog, deleteLog } from "../habitLogs/state/slice.ts";
import './habitDetail.css';
import Calendar from "../habitLogs/Calendar.tsx";

const HabitDetail: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const habits = useSelector((state: RootState) => state.habits.habits);
    const user = useSelector((state: RootState) => state.user.user);
    const { id } = useParams<{ id: string }>();
    const status = useSelector((state: RootState) => state.habits.deleteStatus);
    const navigate = useNavigate();
    const addLogStatus = useSelector((state: RootState) => state.logs.addLogStatus);
    const deleteLogStatus = useSelector((state: RootState) => state.logs.deleteLogStatus);

    const [delClicked, setDelClicked] = useState<boolean>(false);

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
        const logItem = { habitId, date, email: user?.email };
        dispatch(addLog(logItem));
    };

    const handleUncompleteHabit = (habitId: number) => {
        const date = getCurrentDate();
        const logItem = { habitId, date, email: user?.email };
        dispatch(deleteLog(logItem));
    };

    useEffect(() => {
        if (status === 'success') {
            navigate('/habits');
            dispatch(resetDeleteHabitStatus());
        }
    }, [status, navigate, dispatch]);

    const handleDecision = () => {
        setDelClicked(true);
    };

    const handleAbort = () => {
        setDelClicked(false);
    }

    return (
        <>
            <div className="main-container">
                {habit ? (
                    <div>
                        <h2 className="habit-name">{habit.name}</h2>
                        <p className="category">Category: {habit.category}</p>
                        <p className="frequency">Frequency: {habit.frequency}</p>
                        <p className="current">Current Streak: {habit.current_streak}</p>
                        <p className="max">Max Streak: {habit.max_streak}</p>
                        <p className="completed">Completed: {habit.completed ? "Yes" : "No"}</p>
                        {
                            !habit.completed
                            ?
                            <button className="done-button" onClick={() => handleCompleteHabit(Number(id))}>mark as done</button>
                            :
                            <button className="undone-button" onClick={() => handleUncompleteHabit(Number(id))}>undo</button>
                        }
                        <Calendar habitId={habit.habit_id} />
                        <History habitId={habit.habit_id} />
                    </div>
                ) : (
                    <p>Habit not found.</p>
                )}
                <Link className="edit" to={`/habits/edit/${id}`}>edit habit</Link>
                {
                    delClicked
                    ?
                    <div>
                        <h3>Are you sure you want to give up - {habit?.name}?</h3>
                        <button className="yes" onClick={handleDelete}>Yes, I give up...</button>
                        <button className="no" onClick={handleAbort}>No, I will keep trying!</button>
                    </div>
                    :
                    <button className="delete" onClick={handleDecision}>delete habit</button>
                }
                <Link className="back" to="/habits">back to habits</Link>
            </div>
        </>
    );
}
 
export default HabitDetail;