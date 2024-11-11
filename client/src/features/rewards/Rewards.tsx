import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store.ts";
import { getAllRewards, getAllUserRewards } from "./state/slice.ts";
import Reward from "./Reward.tsx";

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
            {
                allRewards.map(reward => {
                    const hasUserReward = userRewardIds.has(reward.reward_id);
                    return (
                        <div 
                            key={reward.reward_id}
                            className={hasUserReward ? `${reward.reward_type}` : "unrecieved"}
                        >
                            <Reward
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
        </>
    );
}
 
export default Rewards;