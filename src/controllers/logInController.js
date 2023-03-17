const Login = require('../models/LoginModel');

exports.index = (request, response, next) => {
    response.render('login');
};

exports.register = async function(request, response) {
    try {
        const login = new Login(request.body);
        await login.register();
    
        if(login.errors.length > 0) {
            request.flash('errors', login.errors);
            request.session.save(function() {
                return response.redirect('/login/index');
            });
            return;
        }
    
        request.flash('success', 'Your account has been created.');
        request.session.save(function() {
            return response.redirect('/login/index');
        });
    } catch(e) {
        console.log(e);
        return response.render('404');
    }
};