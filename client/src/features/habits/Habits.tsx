import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store.ts";
import Habit from "./Habit.tsx";
import { useEffect } from "react";
import { getHabits } from './state/slice.ts';
import { Link } from "react-router-dom";

const Habits: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const habits = useSelector((state: RootState) => state.habits.habits);

    useEffect(() => {
        dispatch(getHabits());
    }, [dispatch]);
    
    return (
        <>
            <h2>Habits</h2>
            <Link to='/habits/new'>Add New habit</Link>
            {
                habits.map(habit => {
                    return (
                        <div key={habit.habit_id}>
                            <Link to={`/habits/detail/${habit.habit_id}`}>
                                <Habit
                                habitId={habit.habit_id}
                                name={habit.name}
                                category={habit.category}
                                frequency={habit.frequency}
                                currentStreak={habit.current_streak}
                                completed={habit.completed} 
                                />
                            </Link>
                        </div>
                    )
                })
            }
        </>
    );
}
 
export default Habits;