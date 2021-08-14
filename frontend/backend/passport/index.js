const passport = require('passport');
const kakao = require('./kakaoStrategy');
const naver = require('./naverStrategy');
const google = require('./googleStrategy');
const socialUser = require('../models/login');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    socialUser
      .findOne({ where: { snsId: user.snsId, provider: user.provider } })
      .then((user) => done(null, user))
      .catch((error) => done(error));
  });

  kakao();
  naver();
  google();
};
