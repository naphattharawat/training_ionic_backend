
'use strict';

import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import * as ejs from 'ejs';
import Knex = require('knex');
import { MySqlConnectionConfig } from 'knex';

import index from './routes/index';
import login from './routes/login';
import api from './routes/api';
import * as cors from 'cors';
import { Jwt } from './jwt';
const jwt = new Jwt();
const app: express.Express = express();

//view engine setup

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.renderFile);
app.set('view engine', 'html');

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
const dbConfig: MySqlConnectionConfig = {
  host: '203.157.146.41',
  port: 3306,
  database: 'dbapps',
  user: 'dbmobile',
  password: '123456'
}

const db = Knex({
  client: 'mysql',
  connection: dbConfig
})

app.use((req, res, next) => {
  req.db = db;
  next();

})

//jwt
const auth = (req, res, next) => {
  let token = req.query.token || req.body.token;
  jwt.verify(token)
  .then((decoded)=>{
    next();
    })
    .catch((error)=>{
      res.send({ok:false,message:'Access denied!'});
    })
}


//
app.use('/login', login);
app.use('/api', api);
app.use('/', index);

//catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

//error handlers

//development error handler
//will print stacktrace
if (process.env.NODE_ENV === 'development') {
  app.use((err: Error, req, res, next) => {
    res.status(err['status'] || 500);
    res.render('error', {
      title: 'error',
      message: err.message,
      error: err
    });
  });
}

//production error handler
// no stacktrace leaked to user
app.use((err: Error, req, res, next) => {
  res.status(err['status'] || 500);
  res.render('error', {
    title: 'error',
    message: err.message,
    error: {}
  });
});

export default app;
