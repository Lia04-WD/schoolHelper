const express = require('express');
const passport = require('passport');
// const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/kakaoLogin', passport.authenticate('kakao'));
router.get('/naverLogin', passport.authenticate('naver'));
router.get(
  '/googleLogin',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: 'http://192.168.219.100:3000/',
  }),
  (req, res) => {
    res.redirect('http://192.168.219.100:3000/home');
  },
);

router.get(
  '/naver/callback',
  passport.authenticate('naver', {
    failureRedirect: 'http://192.168.219.100:3000/',
  }),
  (req, res) => {
    res.redirect('http://192.168.219.100:3000/home');
  },
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://192.168.219.100:3000/',
  }),
  (req, res) => {
    res.redirect('http://192.168.219.100:3000/home');
  },
);

router.post('/getDefaultUserInfo', (req, res) => {
  const retUser = {
    nick: req.user.dataValues.nickName,
    snsId: req.user.dataValues.snsId,
    provider: req.user.dataValues.provider,
  };
  res.json(retUser);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  const retUser = {
    nick: null,
    snsId: null,
    provider: null,
  };
  res.json(retUser);
});

module.exports = router;
