const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    getAllRewardsByEmail,
} = require('../controllers/rewardsController');

const rewardsRouter = Router();

rewardsRouter.post('/', authenticateLoginToken, getAllRewardsByEmail);

module.exports = rewardsRouter;