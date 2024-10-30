const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/usersRouter.js');

const PORT = 3001;

const app = express();

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});

app.use(cors());
app.use(express.json());

app.use('/user', usersRouter);