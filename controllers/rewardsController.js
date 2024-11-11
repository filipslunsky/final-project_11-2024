const {
    _getAllRewardsByEmail,
    _getAllRewards,

} = require('../models/rewardsModel.js');

const getAllRewardsByEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const data = await _getAllRewardsByEmail(email);
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

const getAllRewards = async (req, res) => {
    try {
        const data = await _getAllRewards();
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
    getAllRewardsByEmail,
    getAllRewards,
};