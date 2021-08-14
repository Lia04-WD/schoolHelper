const express = require('express');

const getSchoolInfo = require('../api/getSchoolInfo');
const optionsApply = require('../api/optionsApply');
const getOptions = require('../api/getOptions');

const router = express.Router();

router.post('/searchSchool', (req, res) => {
  const schoolInfo = getSchoolInfo.getSchoolDefault(req.body.name);
  schoolInfo.then((value) => res.json({ schoolNameList: value }));
});

router.post('/apply', (req, res) => {
  const apply = optionsApply.apply(req.user.dataValues, req.body.SchoolInfo);
  apply.then((value) => res.json({ value }));
});

router.post('/getOptions', (req, res) => {
  const options = getOptions.readOptions(req.user.dataValues);
  options.then((value) => res.json({ value }));
});

module.exports = router;
