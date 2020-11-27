const express = require('express');
const intelligentPacking = require('./lib/intelligentPacking');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/intelligentpacking', (req, res) => {
    res.json(intelligentPacking(req.body.boxes, req.body.orders));
});

module.exports = app;