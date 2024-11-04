import React, { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editHabit, resetEditHabitStatus } from "./state/slice";
import { AppDispatch, RootState } from "../../app/store.ts";
import { useNavigate, useParams } from "react-router-dom";

const EditHabit: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const habits = useSelector((state: RootState) => state.habits.habits);
    const status = useSelector((state: RootState) => state.habits.editStatus);
    const navigate = useNavigate();

    const { id } = useParams();

    const habit = habits.find(habit => habit.habit_id === Number(id));

    const nameRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const frequencyRef = useRef<HTMLSelectElement>(null);

    const handleSave = () => {
        if (nameRef.current && categoryRef.current && frequencyRef.current) {
            const editItem = {
                habitId: Number(id),
                name: nameRef.current.value,
                category: categoryRef.current.value,
                frequency: frequencyRef.current.value,
            };
            dispatch(editHabit(editItem));
        }
    };

    const handleCancel = () => {
        navigate('/habits');
    };

    useEffect(() => {
        if (status === 'success') {
            navigate('/habits');
            dispatch(resetEditHabitStatus());
        }
    }, [status, navigate]);

    if (!habit) {
        return (
            <>
                <h2>The habit you wish to edit was not found, please try again later.</h2>
            </>
        )
    }

    return (
        <>
        <h2>Edit</h2>
        <h2>"{habit.name}"</h2>
        <input ref={nameRef} type="text" name="name" placeholder="new task name" />
        <br />
        <select ref={frequencyRef} name="frequency">
            <option value="" disabled>select new frequency</option>
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
        </select>
        <br />
        <select ref={categoryRef} name="category">
            <option value="" disabled>select new category</option>
            <option value="food">food</option>
            <option value="fitness">fitness</option>
            <option value="make good habit">make good habit</option>
            <option value="break bad habit">break bad habit</option>
        </select>
        <br />
        <button onClick={handleSave}>SAVE</button>
        <button onClick={handleCancel}>CANCEL</button>
        </>
    );
}
 
export default EditHabit;