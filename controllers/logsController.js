const {
    _addNewLog,
    _getAllLogsByHabitId,
} = require('../models/logsModel.js');

const addNewLog = async (req, res) => {
    const { habitId, date } = req.body;
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

module.exports = {
    addNewLog,
    getAllLogsByHabitId,
};