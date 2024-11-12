import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store.ts";
import { getAllRewards, getAllUserRewards } from "./state/slice.ts";
import Reward from "./Reward.tsx";
import './rewards.css';

const Rewards: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const allRewards = useSelector((state: RootState) => state.rewards.allRewards);
    const userRewards = useSelector((state: RootState) => state.rewards.userRewards);

    useEffect(() => {
        dispatch(getAllRewards());
        dispatch(getAllUserRewards())
    }, [dispatch]);

    const userRewardIds = new Set(userRewards.map(reward => reward.reward_id));

    return (
        <>
            <h2>Rewards</h2>
            <div className="rewards-container">
                {
                    allRewards.map(reward => {
                        const hasUserReward = userRewardIds.has(reward.reward_id);
                        return (
                            <div
                                key={reward.reward_id}
                            >
                                <Reward
                                    status={hasUserReward ? `${reward.reward_type}` : "unrecieved"}
                                    rewardId={reward.reward_id}
                                    symbol={reward.symbol}
                                    frequency={reward.frequency}
                                    rewardType={reward.reward_type}
                                    rewardGroup={reward.reward_group}
                                />
                            </div>
                        );
                    })
                }  
            </div>          
        </>
    );
}
 
export default Rewards;