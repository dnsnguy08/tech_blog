require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const expsesh = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(expsesh.Store);
const sequelize = require('./config/connection');

const routes = require('./controllers');

// handlebars helpers
const helpers = require('./utils/helpers');

// const exphbs = require('express-handlebars');

// handlebars init
const hbs = exphbs.create({
    helpers,
});

// const session = require('express-session');

// const app = express();
// const PORT = process.env.PORT || 3001;

// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// express session settings
const sessionSettings = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// app.use(session(sessionSettings));
app.use(expsesh(sessionSettings));

// app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Success, Server Up!'));
});
