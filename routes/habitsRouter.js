const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    addNewHabit,
    getAllHabitsByEmail,
    updateHabit,
    deleteHabit,
} = require('../controllers/habitsController.js');

const habitsRouter = Router();

habitsRouter.post('/', addNewHabit);
habitsRouter.get('/all', getAllHabitsByEmail);
habitsRouter.put('/', updateHabit);
habitsRouter.delete('/', deleteHabit);


module.exports = habitsRouter;