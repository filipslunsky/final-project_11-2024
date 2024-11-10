import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store.ts";
import { getHabits, deleteHabit, resetDeleteHabitStatus } from './state/slice.ts';
import History from "../habitLogs/History.tsx";
import { addLog, deleteLog } from "../habitLogs/state/slice.ts";

const HabitDetail: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const habits = useSelector((state: RootState) => state.habits.habits);
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

    const handleDecision = () => {
        setDelClicked(true);
    };

    const handleAbort = () => {
        setDelClicked(false);
    }

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
                        <button onClick={() => handleCompleteHabit(Number(id))}>MARK AS DONE</button>
                        :
                        <button onClick={() => handleUncompleteHabit(Number(id))}>UNDO</button>
                    }
                    <History habitId={habit.habit_id} />
                </div>
            ) : (
                <p>Habit not found.</p>
            )}
            <Link to={`/habits/edit/${id}`}>EDIT HABIT</Link>
            <br />
            {
                delClicked
                ?
                <div>
                    <h3>Are you sure you want to give up - {habit?.name}?</h3>
                    <button onClick={handleDelete}>Yes, I give up</button>
                    <br />
                    <button onClick={handleAbort}>No, I will keep trying</button>
                </div>
                :
                <button onClick={handleDecision}>DELETE HABIT</button>
            }
            <br />
            <Link to="/habits">Back to Habits</Link>
        </>
    );
}
 
export default HabitDetail;