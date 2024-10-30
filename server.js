const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/usersRouter.js');
const habitsRouter = require('./routes/habitsRouter.js');
const logsRouter = require('./routes/logsRouter.js');

require('./jobs/cronTest.js');

const PORT = 3001;

const app = express();

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});

app.use(cors());
app.use(express.json());

app.use('/user', usersRouter);
app.use('/habits', habitsRouter);
app.use('/logs', logsRouter);
