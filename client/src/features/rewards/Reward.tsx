import React from "react";
import './reward.css';

interface RewardProps {
    status: string;
    rewardId: number;
    symbol: number;
    frequency: string;
    rewardType: string;
    rewardGroup: string;
};

const Reward: React.FC<RewardProps> = (props) => {
    let typeConversion: string = '';
    if (props.rewardType === 'bronze') {
        typeConversion = 'one habit streak';
    } else if (props.rewardType === 'silver') {
        typeConversion = 'three habit streaks';
    } else {
        typeConversion = 'ten habit streaks';
    };

    return (
    <>
        <div className="main-container">
            <div className={props.status}>
                <p className="number">{props.symbol}</p>
                <p className="unit">{props.frequency === 'daily' ? 'DAYS' : 'WEEKS'}</p>
                <p className="type">{props.rewardType}</p>
            </div>
            <p className="info">
                {`for keeping ${typeConversion}`}
                <br />
                {`unbroken for ${props.symbol} ${props.frequency === 'daily' ? 'days' : 'weeks'}`}
                </p>
        </div>
    </>
    );
}
 
export default Reward;