const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const logInController = require('./src/controllers/logInController');


// HOME ROUTES
route.get('/', homeController.index);

// LOGIN ROUTES
route.get('/login/index', logInController.index);

module.exports = route;