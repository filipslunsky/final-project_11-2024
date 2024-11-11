import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store.ts";
import { getAllRewards, getAllUserRewards } from "./state/slice.ts";

const Rewards: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const allRewards = useSelector((state: RootState) => state.rewards.allRewards);
    const userRewards = useSelector((state: RootState) => state.rewards.userRewards);

    useEffect(() => {
        dispatch(getAllRewards());
        dispatch(getAllUserRewards())
    }, []);

    return (
        <>
            <h2>Rewards</h2>
            {
                allRewards.map(reward => {
                    return (
                        <div key={reward.reward_id}>
                            <p>{reward.symbol}</p>
                            <p>{reward.frequency}</p>
                            <p>{reward.reward_group}</p>
                            <p>{reward.reward_type}</p>
                        </div>
                    )
                    
                })
            }
            <h2>User Rewards</h2>
            {
                userRewards.map(reward => {
                    return (
                        <div key={reward.reward_id}>
                            <p>{reward.symbol}</p>
                            <p>{reward.frequency}</p>
                            <p>{reward.reward_group}</p>
                            <p>{reward.reward_type}</p>
                        </div>
                    )
                    
                })
            }
        </>
    );
}
 
export default Rewards;