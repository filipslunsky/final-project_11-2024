import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store.ts";
import { getLogs } from './state/slice.ts';
import './calendar.css';

interface CalendarProps {
    habitId: number;
}

const Calendar: React.FC<CalendarProps> = ({ habitId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const logs = useSelector((state: RootState) => state.logs.logs);
    const [calendarRange, setCalendarRange] = useState(30);

    useEffect(() => {
        dispatch(getLogs(habitId));
    }, [dispatch, habitId]);

    const logDates = new Set(
        logs.map(log => {
            const date = new Date(log.date); 
            const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            return utcDate.toISOString().split('T')[0];
        })
    );

    const today = new Date();
    const daysArray = Array.from({ length: calendarRange }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        return utcDate.toISOString().split('T')[0];
    }).reverse();

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCalendarRange(parseInt(e.target.value, 10));
    };

    return (
        <div className="calendar">
            <h2>Last {calendarRange} Days</h2>
            <select  className="range-selector-input" onChange={handleSelect} name="calendarRange">
                <option value='' disabled selected>select range</option>
                <option value={7}>last 7 days</option>
                <option value={30}>last 30 days</option>
                <option value={60}>last 60 days</option>
                <option value={90}>last 90 days</option>
                <option value={120}>last 120 days</option>
            </select>
            <div className="calendar-grid">
                {daysArray.map(date => (
                    <div
                        key={date}
                        className={`calendar-day ${logDates.has(date) ? "highlight" : ""}`}
                    >
                        {date}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;

