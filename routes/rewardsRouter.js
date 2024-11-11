const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    getAllRewardsByEmail,
    getAllRewards,
} = require('../controllers/rewardsController');

const rewardsRouter = Router();

rewardsRouter.post('/', authenticateLoginToken, getAllRewardsByEmail);
rewardsRouter.post('/all', authenticateLoginToken, getAllRewards);

module.exports = rewardsRouter;