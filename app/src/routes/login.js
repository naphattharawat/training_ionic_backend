'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const crypto = require("crypto");
const router = express.Router();
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
            res.send({ ok: true });
        }
        else {
            res.send({ ok: false });
        }
    })
        .catch(error => {
        res.send({ error: error.message });
    });
});
exports.default = router;
//# sourceMappingURL=login.js.map