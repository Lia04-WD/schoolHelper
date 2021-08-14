const Option = require('../models/option');

const getOptions = {};

getOptions.readOptions = async (user) => {
  const optionElements = await Option.findOne({ where: { snsId: user.snsId } });
  if (optionElements.ATPT_OFCDC_SC_CODE) {
    const retObject = {
      ATPT_OFCDC_SC_CODE: optionElements.ATPT_OFCDC_SC_CODE,
      SD_SCHUL_CODE: optionElements.SD_SCHUL_CODE,
      SCHUL_KND_SC_NM: optionElements.SCHUL_KND_SC_NM,
      SCHUL_NM: optionElements.SCHUL_NM,
      grade: optionElements.grade,
      class: optionElements.class,
    };
    return retObject;
  } else {
    const retObject = {
      ATPT_OFCDC_SC_CODE: null,
      SD_SCHUL_CODE: null,
      SCHUL_KND_SC_NM: null,
      SCHUL_NM: null,
      grade: null,
      class: null,
    };
    return retObject;
  }
};

module.exports = getOptions;
