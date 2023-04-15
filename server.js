const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const routes = require('./controllers');
const sequelize = require('./config/connection');


const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
process.on('uncaughtException', function (err) {
  console.log(err);
}); 

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 1000*60*60*24,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 1000 * 60 * 10,
    expiration: 1000 * 60 * 30
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));
app.use(routes);

sequelize.sync({ force: false });

app.listen(PORT, () => {
  console.log(`Now listening on ${PORT}!`);
  });