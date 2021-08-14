const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;

const socialUser = require('../models/login');

module.exports = () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_ID,
        clientSecret: process.env.NAVER_SECRET,
        callbackURL: '/auth/naver/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await socialUser.findOne({
            where: { snsId: profile.id, provider: 'naver' },
          });

          if (exUser) done(null, exUser);
          else {
            const newUser = await socialUser.create({
              snsId: profile.id,
              nickName: profile.displayName,
              email: profile.emails[0].value,
              provider: 'naver',
            });
            const userInfo_catch = {
              nick: profile.displayName,
              snsId: profile.id,
              provider: 'naver',
            };
            done(null, userInfo_catch);
          }
        } catch (error) {
          console.log(error);
          done(error);
        }
      },
    ),
  );
};
