const express = require('express');
const getSchoolInfo = require('../api/getSchoolInfo');

const router = express.Router();

router.post('/getMeal', (req, res) => {
  const getInfo = getSchoolInfo.getMeal(req.body);
  getInfo.then((value) => res.json(value));
});

router.post('/getTimeTable', (req, res) => {
  getSchoolInfo.getTimeTable(req.body, (tableInfo) => {
    res.json(tableInfo);
  });
});

module.exports = router;
