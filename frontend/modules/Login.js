import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.check(e);
        });
    }

    check(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;

        if(!validator.isEmail(emailInput.value)) {
            alert('Invalid Email');
            error = true;
            
        }
        if(passwordInput.value.length < 3 || passwordInput.value.length > 20) {
            alert('Password needs to be between 3 and 20 chars.');
            error = true;
        }

        if(!error) el.submit();

    }
}