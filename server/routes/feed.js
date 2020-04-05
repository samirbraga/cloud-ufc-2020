const express = require('express');
const {
    userFeed: userFeedService
} = require('../controller');

const checkFields = require('../middleware/check-fields');
const feedController = new express.Router();

const feedFields = [
    'start_date', 'end_date'
];

// CRUD in data routes 
feedController.get('/feed', userFeedService.get);
feedController.get('/feed?startDate=<date>&endDate=<date>', checkFields(feedFields), userFeedService.getfeeddate)

module.exports = feedController;