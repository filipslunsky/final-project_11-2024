const { db } = require('../config/db.js');

const continueStreak = async (habitId) => {
    try {
        const streakArr = await db('habit_streaks').select('streak_id', 'habit_id', 'current_streak', 'max_streak', 'completed').where({habit_id: habitId});
        const streak = streakArr[0];
        
        if (!streak.completed) {
            streak.completed = true;
            streak.current_streak++;
        };

        if (streak.current_streak > streak.max_streak) {
            streak.max_streak = streak.current_streak;
        };

        console.log(streak);
        
        return await db('habit_streaks').update({current_streak: streak.current_streak, max_streak: streak.max_streak, completed: streak.completed}).where({habit_id: habitId});
        
    } catch (error) {
        console.log(error);
    }
};

const unContinueStreak = async (habitId) => {
    try {
        const streakArr = await db('habit_streaks').select('streak_id', 'habit_id', 'current_streak', 'max_streak', 'completed').where({habit_id: habitId});
        const streak = streakArr[0];
        
        if (streak.completed) {
            streak.completed = false;
            streak.current_streak--;
        };

        if (streak.current_streak + 1 === streak.max_streak) {
            streak.max_streak--;
        };

        console.log(streak);
        
        return await db('habit_streaks').update({current_streak: streak.current_streak, max_streak: streak.max_streak, completed: streak.completed}).where({habit_id: habitId});
        
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    continueStreak,
    unContinueStreak,
};