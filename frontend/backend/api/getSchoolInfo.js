const axios = require('axios');

const getSchoolInfo = {};

getSchoolInfo.getSchoolDefault = async (schoolName) => {
  const apiArgs = {
    KEY: process.env.NEIS_API_KEY,
    Type: 'json',
    pIndex: 1,
    pSize: 5,
    SCHUL_NM: encodeURI(schoolName),
  };

  const reqUrl = `https://open.neis.go.kr/hub/schoolInfo?KEY=${apiArgs.KEY}&Type=${apiArgs.Type}&pIndex=${apiArgs.pIndex}&pSize=${apiArgs.pSize}&SCHUL_NM=${apiArgs.SCHUL_NM}`;

  try {
    const response = await axios.get(reqUrl);
    const processedData = [];

    if (response.data.schoolInfo !== undefined) {
      for (let i = 0; i < response.data.schoolInfo[1].row.length; i++) {
        processedData.push({
          ATPT_OFCDC_SC_CODE:
            response.data.schoolInfo[1].row[i].ATPT_OFCDC_SC_CODE,
          SD_SCHUL_CODE: response.data.schoolInfo[1].row[i].SD_SCHUL_CODE,
          SCHUL_NM: response.data.schoolInfo[1].row[i].SCHUL_NM,
          ORG_RDNMA: response.data.schoolInfo[1].row[i].ORG_RDNMA,
          SCHUL_KND_SC_NM: response.data.schoolInfo[1].row[i].SCHUL_KND_SC_NM,
        });
      }
      return processedData;
    } else {
      processedData.push({
        ERROR: '일치하는 검색 결과가 없습니다',
      });
      return processedData;
    }
  } catch (err) {
    console.error(err);
    return;
  }
};

const refineDate = () => {
  const timeData = new Date();
  const date = timeData.getDate();
  const vip = timeData.getDay();

  let diff = date - vip + (vip === 0 ? -6 : 1);
  let diffDate = new Date(timeData.setDate(diff));

  const retDate = { start: 0, end: 0 };

  let refinedYear = diffDate.getFullYear();
  let refinedMonth = ('0' + (diffDate.getMonth() + 1)).slice(-2);
  let refinedDate = ('0' + diffDate.getDate()).slice(-2);

  retDate.start = `${refinedYear}${refinedMonth}${refinedDate}`;

  diff = date - vip + (vip === 0 ? -2 : 5);
  diffDate = new Date(timeData.setDate(diff));

  refinedYear = diffDate.getFullYear();
  refinedMonth = ('0' + (diffDate.getMonth() + 1)).slice(-2);
  refinedDate = ('0' + diffDate.getDate()).slice(-2);

  retDate.end = `${refinedYear}${refinedMonth}${refinedDate}`;

  return retDate;
};

const getFulWeekDay = () => {
  let retList = [];

  const timeData = new Date();
  const date = timeData.getDate();
  const vip = timeData.getDay();

  let diff = date - vip + (vip === 0 ? -6 : 1);
  let diffDate = new Date(timeData.setDate(diff));

  let refinedYear = diffDate.getFullYear();
  let refinedMonth = ('0' + (diffDate.getMonth() + 1)).slice(-2);
  let refinedDate = ('0' + diffDate.getDate()).slice(-2);

  retList.push(`${refinedYear}${refinedMonth}${refinedDate}`);

  for (let i = 0; i < 4; i++) {
    diff++;
    diffDate = new Date(timeData.setDate(diff));

    refinedYear = diffDate.getFullYear();
    refinedMonth = ('0' + (diffDate.getMonth() + 1)).slice(-2);
    refinedDate = ('0' + diffDate.getDate()).slice(-2);

    retList.push(`${refinedYear}${refinedMonth}${refinedDate}`);
  }

  return retList;
};

const regexMealData = (rowData) => {
  let retList = [];

  let refinedMeal = rowData
    .replace(/[0-9]|(<br\/>)|[a-z]|[A-Z]/gm, '')
    .replace(/\([^)]*\)/gm, '')
    .replace(/[\.]{1,}/gm, '/')
    .replace(/밥(?!\/)/gm, '밥/');

  let tempMeal = '';
  for (let i = 0; i < refinedMeal.length; i++) {
    if (refinedMeal[i] === '/' || refinedMeal[i] === '\n') {
      retList.push(tempMeal);
      tempMeal = '';
      continue;
    }
    tempMeal += refinedMeal[i];
  }

  return retList;
};

const refineMeal = (data) => {
  let retMealInfo = {
    lunch: [],
    dinner: [],
  };

  const weekList = getFulWeekDay();

  for (let i = 0; i < 5; i++) {
    retMealInfo.lunch[i] = {
      date: weekList[i],
      mealDiet: null,
      kcal: null,
    };
    retMealInfo.dinner[i] = {
      date: weekList[i],
      mealDiet: null,
      kcal: null,
    };
  }

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < data.mealServiceDietInfo[1].row.length; j++) {
      if (
        retMealInfo.lunch[i].date ==
          data.mealServiceDietInfo[1].row[j].MLSV_FROM_YMD &&
        data.mealServiceDietInfo[1].row[j].MMEAL_SC_CODE == 2
      ) {
        const meal = regexMealData(data.mealServiceDietInfo[1].row[j].DDISH_NM);
        retMealInfo.lunch[i].mealDiet = meal;
        retMealInfo.lunch[i].kcal = data.mealServiceDietInfo[1].row[j].CAL_INFO;
      }
    }
  }

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < data.mealServiceDietInfo[1].row.length; j++) {
      if (
        retMealInfo.dinner[i].date ==
          data.mealServiceDietInfo[1].row[j].MLSV_FROM_YMD &&
        data.mealServiceDietInfo[1].row[j].MMEAL_SC_CODE == 3
      ) {
        const meal = regexMealData(data.mealServiceDietInfo[1].row[j].DDISH_NM);
        retMealInfo.dinner[i].mealDiet = meal;
        retMealInfo.dinner[i].kcal =
          data.mealServiceDietInfo[1].row[j].CAL_INFO;
      }
    }
  }

  return retMealInfo;
};

getSchoolInfo.getMeal = async (option) => {
  const apiArgs = {
    KEY: process.env.NEIS_API_KEY,
    Type: 'json',
    pIndex: 1,
    ATPT_OFCDC_SC_CODE: option.ATPT_OFCDC_SC_CODE,
    SD_SCHUL_CODE: option.SD_SCHUL_CODE,
    MLSV_FROM_YMD: refineDate().start,
    MLSV_TO_YMD: refineDate().end,
  };

  const reqUrl = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${apiArgs.KEY}&Type=${apiArgs.Type}&pIndex=${apiArgs.pIndex}&ATPT_OFCDC_SC_CODE=${apiArgs.ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${apiArgs.SD_SCHUL_CODE}&MLSV_FROM_YMD=${apiArgs.MLSV_FROM_YMD}&MLSV_TO_YMD=${apiArgs.MLSV_TO_YMD}`;

  try {
    const response = await axios.get(reqUrl);
    const refinedMealInfo = refineMeal(response.data);
    return refinedMealInfo;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const refineHisTimeTable = (data) => {
  const weekList = getFulWeekDay();
  let refinedTimeTable = { time: [] };

  for (let i = 0; i < 5; i++) {
    refinedTimeTable.time[i] = {
      date: weekList[i],
      table: [],
    };
  }

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < data.hisTimetable[1].row.length; j++) {
      if (
        data.hisTimetable[1].row[j].ALL_TI_YMD == refinedTimeTable.time[i].date
      ) {
        refinedTimeTable.time[i].table.push(
          data.hisTimetable[1].row[j].ITRT_CNTNT,
        );
      }
    }
  }

  return refinedTimeTable;
};

const refineMidTimeTable = (data) => {
  const weekList = getFulWeekDay();
  let refinedTimeTable = { time: [] };

  for (let i = 0; i < 5; i++) {
    refinedTimeTable.time[i] = {
      date: weekList[i],
      table: [],
    };
  }

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < data.misTimetable[1].row.length; j++) {
      if (
        data.misTimetable[1].row[j].ALL_TI_YMD == refinedTimeTable.time[i].date
      ) {
        refinedTimeTable.time[i].table.push(
          data.misTimetable[1].row[j].ITRT_CNTNT,
        );
      }
    }
  }

  return refinedTimeTable;
};

const refineElemTimeTable = (data) => {
  const weekList = getFulWeekDay();
  let refinedTimeTable = { time: [] };

  for (let i = 0; i < 5; i++) {
    refinedTimeTable.time[i] = {
      date: weekList[i],
      table: [],
    };
  }

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < data.elsTimetable[1].row.length; j++) {
      if (
        data.elsTimetable[1].row[j].ALL_TI_YMD == refinedTimeTable.time[i].date
      ) {
        refinedTimeTable.time[i].table.push(
          data.elsTimetable[1].row[j].ITRT_CNTNT,
        );
      }
    }
  }

  return refinedTimeTable;
};

const elementTimeTable = async (apiOptions) => {
  const apiArgs = {
    KEY: process.env.NEIS_API_KEY,
    Type: 'json',
    pIndex: 1,
    ATPT_OFCDC_SC_CODE: apiOptions.ATPT_OFCDC_SC_CODE,
    SD_SCHUL_CODE: apiOptions.SD_SCHUL_CODE,
    GRADE: apiOptions.grade,
    CLASS_NM: apiOptions.class,
    TI_FROM_YMD: refineDate().start,
    TI_TO_YMD: refineDate().end,
  };

  const reqUrl = `https://open.neis.go.kr/hub/elsTimetable?KEY=${apiArgs.KEY}&Type=${apiArgs.Type}&pIndex=${apiArgs.pIndex}&ATPT_OFCDC_SC_CODE=${apiArgs.ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${apiArgs.SD_SCHUL_CODE}&GRADE=${apiArgs.GRADE}&CLASS_NM=${apiArgs.CLASS_NM}&TI_FROM_YMD=${apiArgs.TI_FROM_YMD}&TI_TO_YMD=${apiArgs.TI_TO_YMD}`;

  try {
    const response = await axios.get(reqUrl);
    const timeTable = refineElemTimeTable(response.data);
    return timeTable;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const middleTimeTable = async (apiOptions) => {
  const apiArgs = {
    KEY: process.env.NEIS_API_KEY,
    Type: 'json',
    pIndex: 1,
    ATPT_OFCDC_SC_CODE: apiOptions.ATPT_OFCDC_SC_CODE,
    SD_SCHUL_CODE: apiOptions.SD_SCHUL_CODE,
    GRADE: apiOptions.grade,
    CLASS_NM: apiOptions.class,
    TI_FROM_YMD: refineDate().start,
    TI_TO_YMD: refineDate().end,
  };

  const reqUrl = `https://open.neis.go.kr/hub/misTimetable?KEY=${apiArgs.KEY}&Type=${apiArgs.Type}&pIndex=${apiArgs.pIndex}&ATPT_OFCDC_SC_CODE=${apiArgs.ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${apiArgs.SD_SCHUL_CODE}&GRADE=${apiArgs.GRADE}&CLASS_NM=${apiArgs.CLASS_NM}&TI_FROM_YMD=${apiArgs.TI_FROM_YMD}&TI_TO_YMD=${apiArgs.TI_TO_YMD}`;

  try {
    const response = await axios.get(reqUrl);
    const timeTable = refineMidTimeTable(response.data);
    return timeTable;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const highTimeTable = async (apiOptions) => {
  const apiArgs = {
    KEY: process.env.NEIS_API_KEY,
    Type: 'json',
    pIndex: 1,
    ATPT_OFCDC_SC_CODE: apiOptions.ATPT_OFCDC_SC_CODE,
    SD_SCHUL_CODE: apiOptions.SD_SCHUL_CODE,
    GRADE: apiOptions.grade,
    CLASS_NM: apiOptions.class,
    TI_FROM_YMD: refineDate().start,
    TI_TO_YMD: refineDate().end,
  };

  const reqUrl = `https://open.neis.go.kr/hub/hisTimetable?KEY=${apiArgs.KEY}&Type=${apiArgs.Type}&pIndex=${apiArgs.pIndex}&ATPT_OFCDC_SC_CODE=${apiArgs.ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${apiArgs.SD_SCHUL_CODE}&GRADE=${apiArgs.GRADE}&CLASS_NM=${apiArgs.CLASS_NM}&TI_FROM_YMD=${apiArgs.TI_FROM_YMD}&TI_TO_YMD=${apiArgs.TI_TO_YMD}`;

  try {
    const response = await axios.get(reqUrl);
    const timeTable = refineHisTimeTable(response.data);
    return timeTable;
  } catch (error) {
    console.log(error);
    return null;
  }
};

getSchoolInfo.getTimeTable = (option, callback) => {
  switch (option.SCHUL_KND_SC_NM) {
    case '초등학교':
      const retElementAsync = elementTimeTable(option);
      retElementAsync.then((retValue) => {
        callback(retValue);
      });
      break;
    case '중학교':
      const retMiddleAsync = middleTimeTable(option);
      retMiddleAsync.then((retValue) => {
        callback(retValue);
      });
      break;
    case '고등학교':
      const retHighAsync = highTimeTable(option);
      retHighAsync.then((retValue) => {
        callback(retValue);
      });
      break;
    default:
      return null;
  }
};

module.exports = getSchoolInfo;
