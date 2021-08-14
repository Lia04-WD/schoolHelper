const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const socialUser = require('../models/login');

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, cb) => {
        // console.log('profile : ', profile);
        try {
          const exUser = await socialUser.findOne({
            where: { snsId: profile.id, provider: 'google' },
          });

          if (exUser) return cb(null, exUser);
          else {
            const newUser = await socialUser.create({
              snsId: profile.id,
              nickName: profile.displayName,
              email: profile._json.email,
              provider: 'google',
            });
            const userInfo_catch = {
              nick: profile.displayName,
              snsId: profile.id,
              provider: 'google',
            };
            return cb(null, userInfo_catch);
          }
        } catch (error) {
          console.error(error);
          return cb(error);
        }
      },
    ),
  );
};
