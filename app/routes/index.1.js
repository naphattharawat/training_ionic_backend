'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});
router.get('/hello', (req, res, next) => {
    const db = req.db;
    db('person').limit(2)
        .then((result) => { res.send(result); })
        .catch(error => {
        res.send({ error: error.message });
    });
});
exports.default = router;
//# sourceMappingURL=index.1.js.map