const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    addNewLog,
    getAllLogsByHabitId,
    deleteLog,
} = require('../controllers/logsController.js');

const logsRouter = Router();

logsRouter.post('/', addNewLog);
logsRouter.get('/', getAllLogsByHabitId);
logsRouter.delete('/', deleteLog);

module.exports = logsRouter;