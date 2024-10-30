const { db } = require('../config/db.js');

const _addNewHabit = async (name, category, frequency, email) => {
    try {
        return await db.transaction(async (trx) => {
            const userId = await trx('users')
                .select('user_id')
                .where({ email })
                .first();
            if (!userId) {
                return { success: false, message: 'User not found' };
            }

            await trx('habits').insert({
                name,
                category,
                frequency,
                user_id: userId.user_id
            });
            return { success: true, message: 'habit successfully created' };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error adding habit: ${error.message}` };
    }
};

const _getAllHabitsByEmail = async (email) => {
    try {
        return await db.transaction(async (trx) => {
            const userId = await trx('users')
                .select('user_id')
                .where({ email })
                .first();
            if (!userId) {
                return { success: false, message: 'User not found' };
            }

            const habits = await trx('habits').select('habit_id', 'name', 'category', 'frequency').where({user_id: userId.user_id});
            return { success: true, habits };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error retrieving habits: ${error.message}` };
    }
};

const _updateHabit = async (habitId, name, category, frequency) => {
    try {
        return await db.transaction(async (trx) => {
            const habitExists = await trx('habits')
                .where({ habit_id: habitId })
                .first();
            if (!habitExists) {
                return { success: false, message: 'Habit does not exist' };
            }
            const habit = await trx('habits').update({name, category, frequency}).where({ habit_id: habitId });
            return { success: true, habitId, name, category, frequency};
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error updating habit: ${error.message}` };
    }
};

const _deleteHabit = async (habitId) => {
    try {
        return await db.transaction(async (trx) => {
            const habitExists = await trx('habits')
                .where({ habit_id: habitId })
                .first();
            if (!habitExists) {
                return { success: false, message: 'Habit does not exist' };
            }
            await trx('habits').where({habit_id: habitId}).delete();
            return { success: true, message: 'Habit successfully deleted' };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error deleting habit: ${error.message}` };
    }
};

module.exports = {
    _addNewHabit,
    _getAllHabitsByEmail,
    _deleteHabit,
    _updateHabit,
};