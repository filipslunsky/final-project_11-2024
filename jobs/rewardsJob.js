const { db } = require('../config/db.js');

const getAllStreaksByEmailAndFrequnecy = async (email, frequency) => {
    try {
        return await db.transaction(async (trx) => {
            const userId = await trx('users')
                .select('user_id')
                .where({ email })
                .first();
            if (!userId) {
                return { success: false, message: 'User not found' };
            }

            const habits = await trx('habits')
                .select(
                    'habits.habit_id',
                    'habits.name',
                    'habits.category',
                    'habits.frequency',
                    'habit_streaks.current_streak',
                    'habit_streaks.max_streak',
                    'habit_streaks.completed'
                )
                .join('habit_streaks', 'habit_streaks.habit_id', 'habits.habit_id')
                .where({ 'habits.user_id': userId.user_id, 'habits.frequency': frequency });
            return { habits };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error retrieving habits: ${error.message}` };
    }
};

module.exports = { getAllStreaksByEmailAndFrequnecy };