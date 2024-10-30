const {
    _addNewHabit,
    _getAllHabitsByEmail,
    _updateHabit,
    _deleteHabit,
} = require('../models/habitsModel.js');

const addNewHabit = async (req, res) => {
    const { name, category, frequency, email } = req.body;
    try {
        const data = await _addNewHabit(name, category, frequency, email);
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

const getAllHabitsByEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const data = await _getAllHabitsByEmail(email);
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

const updateHabit = async (req, res) => {
    const { habitId, name, category, frequency } = req.body;
    try {
        const data = await _updateHabit(habitId, name, category, frequency);
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

const deleteHabit = async (req, res) => {
    const { habitId } = req.body;
    try {
        const data = await _deleteHabit(habitId);
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
    addNewHabit,
    getAllHabitsByEmail,
    updateHabit,
    deleteHabit,
};