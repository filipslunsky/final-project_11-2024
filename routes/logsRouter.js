const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    addNewLog,
    getAllLogsByHabitId,
} = require('../controllers/logsController.js');

const logsRouter = Router();

logsRouter.post('/', addNewLog);
logsRouter.get('/', getAllLogsByHabitId)

module.exports = logsRouter;