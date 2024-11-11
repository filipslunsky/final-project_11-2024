const { db } = require('../config/db.js');
const { getAllStreaksByEmailAndFrequnecy } = require('./rewardsJob.js');

const calculateTotalWeeklyStreaks = async (email) => {
    const habitsArr = await getAllStreaksByEmailAndFrequnecy(email, 'weekly');
    let streak4 = 0, streak12 = 0, streak26 = 0, streak52 = 0, streak100 = 0;

    habitsArr.habits.forEach(habit => {
        const { max_streak } = habit;

        switch (true) {
            case max_streak >= 100:
                streak100++;
            case max_streak >= 52:
                streak52++;
            case max_streak >= 26:
                streak26++;
            case max_streak >= 12:
                streak12++;
            case max_streak >= 4:
                streak4++;
                break;
            default:
                break;
        }
    });

    const result = { streak4, streak12, streak26, streak52, streak100 };
    return result;
};

const calculateWeeklyRewards = (totalWeeklyStreaks) => {
    const { streak4, streak12, streak26, streak52, streak100 } = totalWeeklyStreaks;
    let rewards = [];
    if (streak100 >= 10) {
        rewards.push({frequency: 'weekly', rewardType: 'gold', symbol: 100});
    } else if (streak100 >= 3) {
        rewards.push({frequency: 'weekly', rewardType: 'silver', symbol: 100});
    } else if (streak100 >= 1) {
        rewards.push({frequency: 'weekly', rewardType: 'bronze', symbol: 100});
    };
    if (streak52 >= 10) {
        rewards.push({frequency: 'weekly', rewardType: 'gold', symbol: 52});
    } else if (streak52 >= 3) {
        rewards.push({frequency: 'weekly', rewardType: 'silver', symbol: 52});
    } else if (streak52 >= 1) {
        rewards.push({frequency: 'weekly', rewardType: 'bronze', symbol: 52});
    };
    if (streak26 >= 10) {
        rewards.push({frequency: 'weekly', rewardType: 'gold', symbol: 26});
    } else if (streak26 >= 3) {
        rewards.push({frequency: 'weekly', rewardType: 'silver', symbol: 26});
    } else if (streak26 >= 1) {
        rewards.push({frequency: 'weekly', rewardType: 'bronze', symbol: 26});
    };
    if (streak12 >= 10) {
        rewards.push({frequency: 'weekly', rewardType: 'gold', symbol: 12});
    } else if (streak12 >= 3) {
        rewards.push({frequency: 'weekly', rewardType: 'silver', symbol: 12});
    } else if (streak12 >= 1) {
        rewards.push({frequency: 'weekly', rewardType: 'bronze', symbol: 12});
    };
    if (streak4 >= 10) {
        rewards.push({frequency: 'weekly', rewardType: 'gold', symbol: 4});
    } else if (streak4 >= 3) {
        rewards.push({frequency: 'weekly', rewardType: 'silver', symbol: 4});
    } else if (streak4 >= 1) {
        rewards.push({frequency: 'weekly', rewardType: 'bronze', symbol: 4});
    };
    return rewards;

};

const listRewards = async (email) => {
    const totalWeeklyStreaks = await calculateTotalWeeklyStreaks(email);
    const rewardList = calculateWeeklyRewards(totalWeeklyStreaks);
    return rewardList;
};

const addWeeklyRewardsToUser = async (email) => {
    const rewardsArray = await listRewards(email);

    try {
        await db.transaction(async trx => {
            const user = await trx('users')
                .select('user_id')
                .where({ email })
                .first();
            if (!user) {
                throw new Error('User not found');
            }

            const userId = user.user_id;

            for (const reward of rewardsArray) {
                const { frequency, rewardType, symbol } = reward;

                const rewardData = await trx('rewards')
                    .select('reward_id')
                    .where({
                        frequency,
                        reward_type: rewardType,
                        symbol,
                        reward_group: 'streak'
                    })
                    .first();

                if (!rewardData) {
                    throw new Error(`Reward not found for ${JSON.stringify(reward)}`);
                }
                const rewardId = rewardData.reward_id;

                await trx('user_rewards').insert({
                    user_id: userId,
                    reward_id: rewardId
                });
            }
        });
        
        console.log("Rewards successfully added to user.");
    } catch (error) {
        console.error("Error adding rewards to user:", error.message);
    }
};

module.exports = {
    addWeeklyRewardsToUser,
};
