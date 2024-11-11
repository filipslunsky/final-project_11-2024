import React from "react";

interface RewardProps {
    rewardId: number;
    symbol: number;
    frequency: string;
    rewardType: string;
    rewardGroup: string;
};

const Reward: React.FC<RewardProps> = (props) => {
    return (
    <>
        <h3>{props.rewardId}</h3>
        <p>Category: {props.symbol}</p>
        <p>Frequency: {props.frequency}</p>
        <p>Current Streak: {props.rewardType}</p>
        <p>Completed: {props.rewardGroup}</p>
    </>
    );
}
 
export default Reward;