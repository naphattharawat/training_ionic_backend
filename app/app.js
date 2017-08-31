'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Knex = require("knex");
const index_1 = require("./routes/index");
const login_1 = require("./routes/login");
const api_1 = require("./routes/api");
const cors = require("cors");
const jwt_1 = require("./jwt");
const jwt = new jwt_1.Jwt();
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
const dbConfig = {
    host: '203.157.146.41',
    port: 3306,
    database: 'dbapps',
    user: 'dbmobile',
    password: '123456'
};
const db = Knex({
    client: 'mysql',
    connection: dbConfig
});
app.use((req, res, next) => {
    req.db = db;
    next();
});
const auth = (req, res, next) => {
    let token = req.query.token || req.body.token;
    jwt.verify(token)
        .then((decoded) => {
        next();
    })
        .catch((error) => {
        res.send({ ok: false, message: 'Access denied!' });
    });
};
app.use('/login', login_1.default);
app.use('/api', api_1.default);
app.use('/', index_1.default);
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
if (process.env.NODE_ENV === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            title: 'error',
            message: err.message,
            error: err
        });
    });
}
app.use((err, req, res, next) => {
    res.status(err['status'] || 500);
    res.render('error', {
        title: 'error',
        message: err.message,
        error: {}
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map