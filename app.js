const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const helmet = require("helmet");
const passport = require('passport');
require("dotenv").config({ path: "./config.env" });
const app = express();
const port = process.env.PORT || 5000;
const db = require("./db/conn");





//routes
const authRoutes = require("./routes/auth")
const questionRoutes = require("./routes/question")
const usersRoutes = require("./routes/users")

const allowlist = [
    'http://sarkis.dev',
];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    let isDomainAllowed = allowlist.indexOf(req.header('Origin')) !== -1;
    if (isDomainAllowed) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: true }//ATENTION!
    }
    callback(null, corsOptions)
}

app.use(cors(corsOptionsDelegate));

app.use(helmet());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());


//Routes
app.use('/auth', authRoutes);
app.use('/question', questionRoutes)
app.use('/users', usersRoutes)

app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).send('Internal Server Error');
});

const server = app.listen(port, () => {
    console.log('Server is up and running at port: ' + port);
});

db()
