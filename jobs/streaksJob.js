const { db } = require('../config/db.js');

const calculateStreak = async (habitId) => {
    try {
        const streakArr = await db('habit_streaks').select('streak_id', 'habit_id', 'current_streak', 'max_streak').where({habit_id: habitId});
        
        const streak = streakArr[0];

        const latestDate = await db('habit_logs').max('date as latest_date').where({ habit_id: habitId }).first();
        const utcDate = new Date(latestDate.latest_date + 'Z');
        const formattedLatestDate = utcDate.toISOString().split('T')[0];

        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0];
        
        if (formattedToday === formattedLatestDate) {
            streak.current_streak++
        } else {
            streak.current_streak = 0;
        }

        if (streak.current_streak > streak.max_streak) {
            streak.max_streak = streak.current_streak;
        };
        
        return await db('habit_streaks').update({current_streak: streak.current_streak, max_streak: streak.max_streak}).where({habit_id: habitId});
        
        
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    calculateStreak,
};