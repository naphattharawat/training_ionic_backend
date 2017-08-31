'use strict';

import * as express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});
router.get('/hello', (req, res, next) => {
  const db = req.db;
 db('person'
).limit(2)
.then((result) => {res.send(result); })
.catch(error => { 
  res.send({error:error.message});
});
});

export default router;