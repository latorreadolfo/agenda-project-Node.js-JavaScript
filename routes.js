const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contactUsController = require('./src/controllers/contactUsController');

function myMiddleware(request, response, next)  {
    console.log();
    console.log('I had pass on your middleware');
    console.log();
    next();
};

// HOME ROUTES
route.get('/', homeController.homePage);
route.post('/', homeController.dealPost);


// CONTACT US ROUTES
route.get('/contactus', contactUsController.landingPage)

module.exports = route;