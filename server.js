require('dotenv').config(); //-> to save your connection string safe in .env (remind to add this to .gitignore) 
const express = require('express'); // -> calling Express
const app = express();  // -> assigning express to "app"
const mongoose = require('mongoose');

 // -> Mongoose: used to model our database communication with MongoDB (Promise)
mongoose.connect(process.env.CONNECTIONSTRING, 
    { 
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {
        app.emit('success');
    })
    .catch(e => console.log(e));
const session = require('express-session'); // -> to identify our User and save his session information on cookies
const MongoStore = require('connect-mongo'); // -> to save all the sessions on DB
const flash = require('connect-flash'); // -> One use messages saved on session
const routes = require('./routes'); // -> all routes of our APP (/home, /registeruser, /contactus)
const path = require('path'); // -> to define solid paths for internal use in our app
const helmet = require('helmet'); // -> security recommended by Express experts
const csrf = require('csurf'); // -> to generate csrf security tokens for all of our forms 
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware'); // -> Middlewares: functions executed when the route is called,
                                                                                                      //                 optimal use for checking credentials
app.use(helmet());
app.use(express.urlencoded({ extended: true })); //-> this allow us to post forms in our app
app.use(express.json()); // -> this allow us to post json in our app
app.use(express.static(path.resolve(__dirname, 'public'))); //-> all of our static files, that can easily be found by the user (images, css, JS code)

const sessionOptions = session({                        // -> all the Session Configs
    secret: 'nhHgVBNfY76aS7%A5',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized:false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); // files to renderize 
app.set('view engine', 'ejs');

app.use(csrf());
// OUR MIDDLEWARES
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);
app.use(function(request, response, next) {
    response.status(404)
    response.redirect('/')
});

app.on('success', () => {
    app.listen(3000, () => {
        console.log('Server Running on Port: 3000');
        console.log('Access on http://localhost:3000');
    });
    
});

