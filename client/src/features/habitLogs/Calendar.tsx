import React, { useEffect } from "react";
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
    const daysArray = Array.from({ length: 30 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        return utcDate.toISOString().split('T')[0];
    }).reverse();

    return (
        <div className="calendar">
            <h2>Last 30 Days Calendar</h2>
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

