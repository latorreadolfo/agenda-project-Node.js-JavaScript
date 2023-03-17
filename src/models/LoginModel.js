const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
    
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    register() {
        this.validate();
        if(this.errors.length > 0) return;
    }


    validate() {
        this.cleanUp();
        if(!validator.isEmail(this.body.email)) this.errors.push('Invalid E-mail');

        if(this.body.password.length < 3 || this.body.password.length > 20) {
            this.errors.push('The password needs to be between 3 and 20 characters.');
        }
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }
}

module.exports = Login;