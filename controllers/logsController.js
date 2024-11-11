const {
    _addNewLog,
    _getAllLogsByHabitId,
    _deleteLog,
} = require('../models/logsModel.js');

const { addDailyRewardsToUser } = require('../jobs/dailyRewardsJob.js');
const { addWeeklyRewardsToUser } = require('../jobs/weeklyRewardsJob');

const addNewLog = async (req, res) => {
    const { habitId, date, email } = req.body;
    try {
        await addDailyRewardsToUser(email);
    await addWeeklyRewardsToUser(email);
    } catch (error) {
        console.log(error);
    }
    
    
    try {
        const data = await _addNewLog(habitId, date);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        };
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllLogsByHabitId = async (req, res) => {
    const { habitId } = req.body;
    try {
        const data = await _getAllLogsByHabitId(habitId);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        };
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteLog = async (req, res) => {
    const { habitId, date } = req.body;
    try {
        const data = await _deleteLog(habitId, date);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        };
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    addNewLog,
    getAllLogsByHabitId,
    deleteLog,
};