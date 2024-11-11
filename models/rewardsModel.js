const { db } = require('../config/db.js');

const _getAllRewardsByEmail = async (email) => {
    try {
        return await db.transaction(async (trx) => {
            const userId = await trx('users')
                .select('user_id')
                .where({ email })
                .first();
            if (!userId) {
                return { success: false, message: 'User not found' };
            }

            const rewards = await trx('user_rewards')
                .select(
                    'user_rewards.user_reward_id',
                    'user_rewards.user_id',
                    'user_rewards.reward_id',
                    'rewards.symbol',
                    'rewards.frequency',
                    'rewards.reward_type',
                    'rewards.reward_group'
                )
                .join('rewards', 'user_rewards.reward_id', 'rewards.reward_id')
                .where({ 'user_rewards.user_id': userId.user_id });
            return { success: true, rewards };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error retrieving habits: ${error.message}` };
    }
};

module.exports = {
    _getAllRewardsByEmail,
};