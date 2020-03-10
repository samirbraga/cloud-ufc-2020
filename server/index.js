require('dotenv').config();

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);

// BodyParser middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Referer, User-Agent, x-signup-token, x-access-token, x-recover-token");
    next();
});

/**
 * Call API controllers into every app requests
 * The controllers maps from router to respective service.
 */
require('./controller')(app);

const PORT = process.env.PORT || process.env.NODE_PORT || 5000;
server.listen(PORT, () => {
    const logMessage = `INSTAGRAM-LIKE APP SERVER RUNNING ON PORT ${PORT}`;

    console.log(`
╭───┬─${"─".repeat(logMessage.length)}─┐
│ ! │ ${logMessage} │
└───┴─${"─".repeat(logMessage.length)}─╯
    `)
});

module.exports = app;
