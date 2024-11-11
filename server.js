const express = require('express');
const cors = require('cors');
const path = require("path");

const usersRouter = require('./routes/usersRouter.js');
const habitsRouter = require('./routes/habitsRouter.js');
const logsRouter = require('./routes/logsRouter.js');
const rewardsRouter = require('./routes/rewardsRouter.js');

require('./jobs/cronJobs.js');

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
app.use('/rewards', rewardsRouter);

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
