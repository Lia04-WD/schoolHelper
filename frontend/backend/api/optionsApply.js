const Option = require('../models/option');

const optionsApply = {};

optionsApply.apply = async (user, SchoolInfo) => {
  try {
    const exOption = await Option.findOne({ where: { snsId: user.snsId } });
    if (exOption) {
      const updateOption = await Option.update(
        {
          ATPT_OFCDC_SC_CODE: SchoolInfo.ATPT_OFCDC_SC_CODE,
          SD_SCHUL_CODE: SchoolInfo.SD_SCHUL_CODE,
          SCHUL_NM: SchoolInfo.SCHUL_NM,
          ORG_RDNMA: SchoolInfo.ORG_RDNMA,
          SCHUL_KND_SC_NM: SchoolInfo.SCHUL_KND_SC_NM,
          grade: parseInt(SchoolInfo.grade),
          class: parseInt(SchoolInfo.class),
        },
        { where: { snsId: user.snsId } },
      );

      if (updateOption) return true;
      else return false;
    } else {
      const createOption = await Option.create({
        snsId: user.snsId,
        ATPT_OFCDC_SC_CODE: SchoolInfo.ATPT_OFCDC_SC_CODE,
        SD_SCHUL_CODE: SchoolInfo.SD_SCHUL_CODE,
        SCHUL_NM: SchoolInfo.SCHUL_NM,
        ORG_RDNMA: SchoolInfo.ORG_RDNMA,
        SCHUL_KND_SC_NM: SchoolInfo.SCHUL_KND_SC_NM,
        grade: parseInt(SchoolInfo.grade),
        class: parseInt(SchoolInfo.class),
      });
      if (createOption) return true;
      else return false;
    }
  } catch (error) {
    return false;
  }
};

module.exports = optionsApply;
