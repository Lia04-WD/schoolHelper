const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const socialUser = require('../models/login');

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log('kakao profile', profile);
        try {
          const exUser = await socialUser.findOne({
            where: { snsId: profile.id, provider: 'kakao' },
          });

          if (exUser) done(null, exUser);
          else {
            const newUser = await socialUser.create({
              snsId: profile.id,
              nickName: profile.displayName,
              email: profile._json && profile._json.kakao_account.email,
              provider: 'kakao',
            });
            const userInfo_catch = {
              nick: profile.displayName,
              snsId: profile.id,
              provider: 'kakao',
            };
            done(null, userInfo_catch);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};
