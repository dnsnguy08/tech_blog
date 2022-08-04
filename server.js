require('dotenv').config();
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

// handlebars helpers
const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');

// handlebars init
const hbs = exphbs.create({
    helpers,
});

const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// express session settings
const sessionSettings = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sessionSettings));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Success, Serve Up!'));
});
