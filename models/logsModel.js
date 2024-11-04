const { db } = require('../config/db.js');

const {
    continueStreak,
    unContinueStreak
} = require('../jobs/streaksJob.js');

const _addNewLog = async (habitId, date) => {
    try {
        return await db.transaction(async (trx) => {
            const logExists = await trx('habit_logs')
                .where({ habit_id: habitId, date})
                .first();
            if (logExists) {
                return { success: false, message: 'Log already exists' };
            }
            await trx('habit_logs').insert({
                habit_id: habitId,
                date,
            });

            continueStreak(habitId);
            
            return { success: true, message: 'Log successfully created' };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error adding log: ${error.message}` };
    }
};

const _getAllLogsByHabitId = async (habitId) => {
    try {
        return await db.transaction(async (trx) => {
            const habitExists = await trx('habit_logs')
                .select('log_id')
                .where({ habit_id: habitId })
                .first();
            if (!habitExists) {
                return { success: true, message: 'No logs found', habitLogs: [] };
            }
            const habitLogs = await trx('habit_logs').select('log_id', 'habit_id', 'date').where({habit_id: habitId}).orderBy('date');
            return { success: true, message: 'Logs found', habitLogs };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error retrieving logs: ${error.message}` };
    }
};

const _deleteLog = async (habitId, date) => {
    try {
        return await db.transaction(async (trx) => {
            const logId = await trx('habit_logs')
                .select('log_id')
                .where({ habit_id: habitId, date })
                .first();
            if (!logId) {
                return { success: false, message: 'Log does not exist' };
            }
            await trx('habit_logs').where({log_id: logId.log_id}).delete();

            unContinueStreak(habitId);

            return { success: true, message: `Log successfully deleted for ${date}` };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error deleting log: ${error.message}` };
    }
};

module.exports = {
    _addNewLog,
    _getAllLogsByHabitId,
    _deleteLog,
};