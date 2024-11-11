import React, { useEffect } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store.ts";
import { getLogs } from './state/slice.ts';

interface HistoryProps {
    habitId: number;
}

const History: React.FC<HistoryProps> = ({ habitId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const logs = useSelector((state: RootState) => state.logs.logs);

    useEffect(() => {
        dispatch(getLogs(habitId));
    }, [dispatch, habitId]);

    const data = logs.map(log => {
        // Fix: Use UTC to parse and format the date consistently
        const date = new Date(log.date);
        const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())); // Ensure UTC date
        return {
            date: utcDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
            done: 1
        };
    });

    return (
        <>
            <h2>History</h2>
            {
                logs.length > 0 ? (
                    <ResponsiveContainer width="100%" height={200}>
                        <ScatterChart>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                type="category"
                            />
                            <YAxis dataKey="done" hide domain={[0, 2]} />
                            <Tooltip
                                formatter={(value, name) => 
                                    name === "date" ? value : value
                                }
                            />
                            <Scatter data={data} fill="#8884d8" />
                        </ScatterChart>
                    </ResponsiveContainer>
                ) : (
                    <p>There are no logs for this task yet</p>
                )
            }
        </>
    );
};

export default History;
