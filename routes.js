const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const logInController = require('./src/controllers/logInController');
const contactController = require('./src/controllers/contactController');

const { loginRequired } = require('./src/middlewares/middleware');


// HOME ROUTES
route.get('/', homeController.index);

// LOGIN ROUTES
route.get('/login/index', logInController.index);
route.post('/login/register', logInController.register);
route.post('/login/login', logInController.login);
route.get('/login/logout', logInController.logout);

//CONTACTS ROUTES
route.get('/contact/index', loginRequired, contactController.index);
route.post('/contact/create', loginRequired, contactController.create);
route.get('/contact/index/:id', loginRequired, contactController.editIndex);
route.post('/contact/edit/:id', loginRequired, contactController.edit);
route.get('/contact/delete/:id', loginRequired, contactController.delete);



module.exports = route;