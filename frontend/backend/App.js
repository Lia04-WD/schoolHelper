const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const morgan = require('morgan');

const loginRouter = require('./routes/auth');
const optionRouter = require('./routes/option');
const schoolInfo = require('./routes/school');

dotenv.config();
const passportConfig = require('./passport');

const { sequelize } = require('./models');

const app = express();
passportConfig();
app.set('port', process.env.PORT || 4000);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Success to connect database!!');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = null;
  next();
});

app.use('/auth', loginRouter);
app.use('/option', optionRouter);
app.use('/school', schoolInfo);

// error processing middleware
app.use((err, req, res, next) => {});

app.listen(app.get('port'), () => {
  console.log('starting on port:', app.get('port'));
});
