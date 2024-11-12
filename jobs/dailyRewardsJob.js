const { db } = require('../config/db.js');
const { getAllStreaksByEmailAndFrequnecy } = require('./rewardsJob.js');

const calculateTotalDailyStreaks = async (email) => {
    const habitsArr = await getAllStreaksByEmailAndFrequnecy(email, 'daily');
    let streak3 = 0, streak7 = 0, streak30 = 0, streak100 = 0, streak365 = 0, streak500 = 0, streak1000 = 0;

    habitsArr.habits.forEach(habit => {
        const { max_streak } = habit;

        switch (true) {
            case max_streak >= 1000:
                streak1000++;
            case max_streak >= 500:
                streak500++;
            case max_streak >= 365:
                streak365++;
            case max_streak >= 100:
                streak100++;
            case max_streak >= 30:
                streak30++;
            case max_streak >= 7:
                streak7++;
            case max_streak >= 3:
                streak3++;
                break;
            default:
                break;
        }
    });

    const result = { streak3, streak7, streak30, streak100, streak365, streak500, streak1000 };
    return result;
};

const calculateDailyRewards = (totalDailyStreaks) => {
    const { streak3, streak7, streak30, streak100, streak365, streak500, streak1000 } = totalDailyStreaks;
    let rewards = [];
    if (streak1000 >= 10) {
        rewards.push({frequency: 'daily', rewardType: 'gold', symbol: 1000});
    } else if (streak1000 >= 3) {
        rewards.push({frequency: 'daily', rewardType: 'silver', symbol: 1000});
    } else if (streak1000 >= 1) {
        rewards.push({frequency: 'daily', rewardType: 'bronze', symbol: 1000});
    };
    if (streak500 >= 10) {
        rewards.push({frequency: 'daily', rewardType: 'gold', symbol: 500});
    } else if (streak500 >= 3) {
        rewards.push({frequency: 'daily', rewardType: 'silver', symbol: 500});
    } else if (streak500 >= 1) {
        rewards.push({frequency: 'daily', rewardType: 'bronze', symbol: 500});
    };
    if (streak365 >= 10) {
        rewards.push({frequency: 'daily', rewardType: 'gold', symbol: 365});
    } else if (streak365 >= 3) {
        rewards.push({frequency: 'daily', rewardType: 'silver', symbol: 365});
    } else if (streak365 >= 1) {
        rewards.push({frequency: 'daily', rewardType: 'bronze', symbol: 365});
    };
    if (streak100 >= 10) {
        rewards.push({frequency: 'daily', rewardType: 'gold', symbol: 100});
    } else if (streak100 >= 3) {
        rewards.push({frequency: 'daily', rewardType: 'silver', symbol: 100});
    } else if (streak100 >= 1) {
        rewards.push({frequency: 'daily', rewardType: 'bronze', symbol: 100});
    };
    if (streak30 >= 10) {
        rewards.push({frequency: 'daily', rewardType: 'gold', symbol: 30});
    } else if (streak30 >= 3) {
        rewards.push({frequency: 'daily', rewardType: 'silver', symbol: 30});
    } else if (streak30 >= 1) {
        rewards.push({frequency: 'daily', rewardType: 'bronze', symbol: 30});
    };
    if (streak7 >= 10) {
        rewards.push({frequency: 'daily', rewardType: 'gold', symbol: 7});
    } else if (streak7 >= 3) {
        rewards.push({frequency: 'daily', rewardType: 'silver', symbol: 7});
    } else if (streak7 >= 1) {
        rewards.push({frequency: 'daily', rewardType: 'bronze', symbol: 7});
    };
    if (streak3 >= 10) {
        rewards.push({frequency: 'daily', rewardType: 'gold', symbol: 3});
    } else if (streak3 >= 3) {
        rewards.push({frequency: 'daily', rewardType: 'silver', symbol: 3});
    } else if (streak3 >= 1) {
        rewards.push({frequency: 'daily', rewardType: 'bronze', symbol: 3});
    };
    return rewards;
};

const listRewards = async (email) => {
    const totalDailyStreaks = await calculateTotalDailyStreaks(email);
    const rewardList = calculateDailyRewards(totalDailyStreaks);
    return rewardList;
};

const addDailyRewardsToUser = async (email) => {
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
    addDailyRewardsToUser,
};
