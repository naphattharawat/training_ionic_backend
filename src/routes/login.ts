'use strict';
import * as express from 'express';
import * as crypto from 'crypto';
import { Jwt } from '../jwt';
const jwt = new Jwt();
const router = express.Router();

/* GET home page. */
router.post('/', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const encPassword = crypto.createHash('md5').update(password).digest('hex');

  const db = req.db;
  db('users').where({
    'username': username,
    'password': encPassword
  })
    .then((result) => {
      if (result.length) {
        const payload = {
          useraccess: result[0].useraccess,
          fullname: result[0].fullname
        };
        const token = jwt.sign(payload);
        res.send({ ok: true,token:token });
      }
      else {
        res.send({ ok: false });
      }
    })
    .catch(error => {
      res.send({ error: error.message });
    });
});


export default router;