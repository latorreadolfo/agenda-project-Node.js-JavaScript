import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';

const login = new Login('.form-register');
const register = new Login('.form-login');
login.init();
register.init();