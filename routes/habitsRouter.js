const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    addNewHabit,
    getAllHabitsByEmail,
    updateHabit,
    deleteHabit,
} = require('../controllers/habitsController.js');

const habitsRouter = Router();

habitsRouter.post('/', authenticateLoginToken, addNewHabit);
habitsRouter.post('/all',authenticateLoginToken, getAllHabitsByEmail);
habitsRouter.put('/', authenticateLoginToken, updateHabit);
habitsRouter.delete('/', authenticateLoginToken, deleteHabit);

module.exports = habitsRouter;
