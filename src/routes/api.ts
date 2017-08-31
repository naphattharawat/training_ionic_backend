'use strict';

import * as express from 'express';
const router = express.Router();


router.get('/person', (req, res, next) => {
  const db = req.db;
  db('person'
  ).limit(10)
    .then((result) => { res.send(result); })
    .catch(error => {
      res.send({ error: error.message });
    });
});
router.post('/person', (req, res, next) => {
  const db = req.db;
  const name = req.body.name;
  const lname = req.body.lname;
  const sex = req.body.sex;
  const typearea = req.body.typearea;

  if (name && lname && sex && typearea) {
    db('person'
    ).insert({
      HOSPCODE: '10729',
      PID: Math.floor(Math.random() * 1000000),
      NAME: name,
      LNAME: lname,
      SEX: sex,
      TYPEAREA: typearea
    })
      .then((result) => {
        res.send({ ok: true });
      })
      .catch(error => {
        res.send({ error: error.message });
      });
  }
  else {
    res.send({ ok: false, error: 'ข้อมูลไม่ครบ' })
  }
});
router.put('/person', (req, res, next) => {
  const db = req.db;
  const name = req.body.name;
  const lname = req.body.lname;
  const sex = req.body.sex;
  const typearea = req.body.typearea;
  const hospcode = req.body.hospcode;
  const pid = req.body.pid;

  if (name && lname && sex && typearea && pid && hospcode) {
    db('person'
    ).update({
      NAME: name,
      LNAME: lname,
      SEX: sex,
      TYPEAREA: typearea
    }).where({
      HOSPCODE: hospcode,
      PID: pid
    })
      .then((result) => {
        res.send({ ok: true });
      })
      .catch(error => {
        res.send({ error: error.message });
      });
  }
  else {
    res.send({ ok: false, error: 'ข้อมูลไม่ครบ' })
  }
});
router.delete('/person/:hospcode/:pid', (req, res, next) => {
  const db = req.db;
  const hospcode = req.params.hospcode;
  const pid = req.params.pid;
  db('person'
  ).where({
    HOSPCODE: hospcode,
    PID: pid
  }).del()
    .then((result) => {
      res.send({ ok : true })
    })
    .catch(error => {
      res.send({ error: error.message });
    });
});
router.get('/person/search', (req, res, next) => {
  const db = req.db;
  const query = req.query.query;
  const _query = '%' + query + '%';
  db('person'
  ).where(or => {
    or.orWhere('NAME', 'LIKE', _query)
      .orWhere('LNAME', 'LIKE', _query)
      .orWhere('HOSPCODE', 'LIKE', _query)
      .orWhere('PID', 'LIKE', _query)
  })
    .limit(8)
    .then((result) => { res.send(result); })
    .catch(error => {
      res.send({ error: error.message });
    });
})
export default router;