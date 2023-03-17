const Login = require('../models/LoginModel');

exports.index = (request, response, next) => {
    response.render('login');

};

exports.register = function(request, response) {
    const login = new Login(request.body);
    login.register();



    response.send(request.body);
};