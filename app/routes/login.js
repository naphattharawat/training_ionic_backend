'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const crypto = require("crypto");
const jwt_1 = require("../jwt");
const jwt = new jwt_1.Jwt();
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
            const payload = {
                useraccess: result[0].useraccess,
                fullname: result[0].fullname
            };
            const token = jwt.sign(payload);
            res.send({ ok: true, token: token });
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