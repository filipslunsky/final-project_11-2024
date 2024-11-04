import React, { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHabit, resetAddHabitStatus } from "./state/slice";
import { AppDispatch, RootState } from "../../app/store.ts";
import { useNavigate } from "react-router-dom";

const NewHabit: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const status = useSelector((state: RootState) => state.habits.addStatus);
    const navigate = useNavigate();
    const email = useSelector((state: RootState) => state.user.user?.email);

    const nameRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const frequencyRef = useRef<HTMLSelectElement>(null);

    const handleSubmit = () => {
        if (nameRef.current && categoryRef.current && frequencyRef.current && email) {
            const newHabit = {
                email,
                name: nameRef.current.value,
                category: categoryRef.current.value,
                frequency: frequencyRef.current.value,
            };
            dispatch(addHabit(newHabit));
        }
    };

    useEffect(() => {
        if (status === 'success') {
            navigate('/habits');
            dispatch(resetAddHabitStatus());
        }
    }, [status, navigate]);

    return (
        <>
        <h2>Add New Habit</h2>
        <input ref={nameRef} type="text" name="name" placeholder="task name" />
        <br />
        <select ref={frequencyRef} name="frequency">
            <option value="" disabled>select frequency</option>
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
        </select>
        <br />
        <select ref={categoryRef} name="category">
            <option value="" disabled>select category</option>
            <option value="food">food</option>
            <option value="fitness">fitness</option>
            <option value="make good habit">make good habit</option>
            <option value="break bad habit">break bad habit</option>
        </select>
        <br />
        <button onClick={handleSubmit}>ADD</button>
        </>
    );
}
 
export default NewHabit;