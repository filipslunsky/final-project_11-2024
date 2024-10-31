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

const timeCheckStreaksByFrequency = async (frequency) => {
    try {
        const streaks = await db('habits')
            .select(
                'habits.habit_id',
                'habits.frequency',
                'habit_streaks.current_streak',
                'habit_streaks.completed',
                'habit_streaks.streak_id'
            )
            .join('habit_streaks', 'habit_streaks.habit_id', 'habits.habit_id')
            .where({'habits.frequency': frequency});

        for (let i = 0; i < streaks.length; i++) {
            if (streaks[i].completed) {
                streaks[i].completed = false;
            } else {
                streaks[i].current_streak = 0;
            }
            try {
                await db('habit_streaks').update({current_streak: streaks[i].current_streak, completed: streaks[i].completed}).where({streak_id: streaks[i].streak_id});
            } catch (error) {
                console.log(`Error updatin streak id ${streaks[i].streak_id} ${error}`);
            }
        };
    } catch (error) {
        console.log(`Error retrieving streaks ${error}`);
    }
};

module.exports = {
    continueStreak,
    unContinueStreak,
    timeCheckStreaksByFrequency
};