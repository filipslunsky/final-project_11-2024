const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    addNewLog,
    getAllLogsByHabitId,
    deleteLog,
} = require('../controllers/logsController.js');

const logsRouter = Router();

logsRouter.post('/new', authenticateLoginToken, addNewLog);
logsRouter.post('/', authenticateLoginToken, getAllLogsByHabitId);
logsRouter.delete('/', authenticateLoginToken, deleteLog);

module.exports = logsRouter;