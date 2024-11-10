import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store.ts";
import Habit from "./Habit.tsx";
import { getHabits } from './state/slice.ts';
import { Link } from "react-router-dom";
import { addLog, deleteLog } from "../habitLogs/state/slice.ts";
import './habits.css';

const Habits: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const habits = useSelector((state: RootState) => state.habits.habits);
    const addLogStatus = useSelector((state: RootState) => state.logs.addLogStatus);
    const deleteLogStatus = useSelector((state: RootState) => state.logs.deleteLogStatus);

    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedFrequency, setSelectedFrequency] = useState("all");
    const [selectedCompletion, setSelectedCompletion] = useState("all");

    useEffect(() => {
        dispatch(getHabits());
    }, [dispatch, addLogStatus, deleteLogStatus]);

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

    const filteredHabits = habits.filter(habit => {
        const matchesSearchText = habit.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory = selectedCategory === "all" || habit.category === selectedCategory;
        const matchesFrequency = selectedFrequency === "all" || habit.frequency === selectedFrequency;
        const matchesCompletion = selectedCompletion === "all" || habit.completed.toString() === selectedCompletion;
        return matchesSearchText && matchesCategory && matchesFrequency && matchesCompletion;
    });
    
    return (
        <>
            <h2>Habits</h2>
            <div className="select-container">
                <input className="habit-selector-input" onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="search by name"/>
                <select className="habit-selector" name="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="all">all categories</option>
                    <option value="food">food</option>
                    <option value="fitness">fitness</option>
                    <option value="make good habit">make good habit</option>
                    <option value="break bad habit">break bad habit</option>
                </select>
                <select className="habit-selector" name="frequency" value={selectedFrequency} onChange={(e) => setSelectedFrequency(e.target.value)}>
                    <option value="all">any frequency</option>
                    <option value="daily">daily</option>
                    <option value="weekly">weekly</option>
                </select>
                <select className="habit-selector" name="completed" value={selectedCompletion} onChange={(e) => setSelectedCompletion(e.target.value)}>
                    <option value="all">both complete and incomplete</option>
                    <option value="true">complete</option>
                    <option value="false">incomplete</option>
                </select>
            </div>
            <Link className="add-habit" to='/habits/new'>+ add new habit</Link>
            <div className="habits-container">
                {
                    filteredHabits.length > 0
                    ?
                    filteredHabits.map(habit => {
                        return (
                            <div className={habit.category} key={habit.habit_id}>
                                    <div
                                    className={habit.completed ? 'done' : 'undone'}
                                    onClick={() => {
                                        !habit.completed
                                        ?
                                        handleCompleteHabit(habit.habit_id)
                                        :
                                        handleUncompleteHabit(habit.habit_id)
                                    }}>
                                        <Habit
                                        habitId={habit.habit_id}
                                        name={habit.name}
                                        category={habit.category}
                                        frequency={habit.frequency}
                                        currentStreak={habit.current_streak}
                                        completed={habit.completed} 
                                        />
                                        <Link className="more-info" to={`/habits/detail/${habit.habit_id}`}>more info</Link>
                                    </div> 
                            </div>
                        )
                    })
                    :
                        <p className="not-found">No habits found</p>
                }
            </div>
        </>
    );
}
 
export default Habits;