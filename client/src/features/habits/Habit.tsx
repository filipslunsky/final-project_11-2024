import React from "react";

interface HabitProps {
    habitId: number,
    name: string,
    category: string,
    frequency: string,
    currentStreak: number,
    completed: boolean
};

const Habit: React.FC<HabitProps> = (props) => {
    return (
    <>
        <h3>{props.name}</h3>
        <p>Category: {props.category}</p>
        <p>Frequency: {props.frequency}</p>
        <p>Current Streak: {props.currentStreak}</p>
        <p>Complete: {props.completed ? "Yes" : "No"}</p>
    </>
    );
}
 
export default Habit;