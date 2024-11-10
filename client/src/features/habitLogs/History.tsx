import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store.ts";
import { useEffect } from "react";
import { getLogs } from './state/slice.ts';

interface HistoryProps {
    habitId: number
};

const History: React.FC<HistoryProps> = ({ habitId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const logs = useSelector((state: RootState) => state.logs.logs);

    useEffect(() => {
        dispatch(getLogs(habitId));
    }, [dispatch]);

    return (
        <>
            <h2>History</h2>
            {
                logs.length > 0
                ?
                logs.map(log => {
                    return (
                        <div key={log.log_id}>
                            {new Date(log.date).toISOString().split('T')[0]}
                        </div>
                    )
                })
                :
                <p>there are no logs for this task yet</p>
            }
        </>
    );
}
 
export default History;
