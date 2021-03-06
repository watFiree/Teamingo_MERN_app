const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const chalk = require('chalk');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 6969;
const authRouter = require('./routes/authRoutes');
const noteRouter = require('./routes/noteRoutes');
const teamRouter = require('./routes/teamRoutes');
const userRouter = require('./routes/userRoutes');

app.use(
    express.json(),
    express.urlencoded({ extended: false }),
    morgan('tiny'),
    cookieParser(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }),
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
      })
);

const verify = require('./config/verifyToken');
app.use('/auth', authRouter);
app.use('/notes', noteRouter);
app.use('/teams', teamRouter);
app.use('/user', userRouter);
 
app.use(express.static(path.join(__dirname, "client", "build")));

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, dbName: 'database'});
const MongoDB = mongoose.connection;
MongoDB.on('error', console.error.bind(console, 'connection error:'));
MongoDB.once('open', () => {
    console.log('Connected to MongoDB')
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
    app.listen(port, () => console.log(`Listening at port ${chalk.green(port)}`));
})

