import React, { useEffect } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
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

    const data = logs.map(log => ({
        date: new Date(log.date).toISOString().split('T')[0],
        y: 1
    }));

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
                            <YAxis dataKey="y" hide domain={[0, 2]} />
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
