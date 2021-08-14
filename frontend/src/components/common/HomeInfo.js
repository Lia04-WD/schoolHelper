import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  margin: auto;
  width: 50%;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  padding-top: 100px;
`;

const WelecomeMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 25px;
  padding-top: 100px;

  #nickname {
    color: #61aaff;
  }
`;

const SchoolInfo = styled.div`
  padding-top: 40px;
  margin: auto;
  width: 60%;
  align-items: center;

  #getInfoButton {
    width: 100%;
    color: #61aaff;
    background-color: white;
    font-size: 20px;
    font-weight: bold;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
    border: solid 2px #61aaff;
    cursor: pointer;
  }

  #getInfoButton:hover {
    background-color: #61aaff;
    color: white;
  }
`;

const MealArea = styled.div`
  padding-top: 100px;
  #title {
    color: orange;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 25px;
  }

  #title-diet {
    color: orange;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 25px;
  }
`;

const DateAxis = styled.div`
  display: flex;
  justify-content: center;

  & div {
    text-align: center;
    flex: 1;
    color: #61aaff;
    font-size: 25px;
    font-weight: bold;
  }
`;

const MealRow = styled.div`
  display: flex;
  justify-content: center;

  & ul {
    flex: 1;
    list-style: none;
    padding-left: 0px;
    text-align: center;
    font-weight: bold;
  }
  & ul li {
    padding-bottom: 10px;
    font-size: 20px;
  }

  #no-diet {
    color: red;
    font-weight: bold;
    font-size: 18px;
  }
`;

const TimeTable = styled.div`
  padding-top: 50px;

  #title-timeTable {
    color: orange;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 25px;
  }
`;

const TimeTableRow = styled.div`
  display: flex;
  justify-content: center;

  & ul {
    flex: 1;
    list-style: none;
    padding-left: 0px;
    text-align: center;
    font-weight: bold;
  }
  & ul li {
    padding-bottom: 10px;
    font-size: 20px;
  }

  #no-table {
    color: red;
    font-weight: bold;
    font-size: 18px;
  }
`;

const NavContent = styled.div`
  padding-top: 100px;
  display: flex;

  & div {
    flex: 0.5;
    justify-content: center;
    text-align: center;
  }

  & a {
    text-decoration: none;
    color: #61aaff;
    font-size: 30px;
    font-weight: bold;
  }

  & a:hover {
    color: blue;
  }
`;

const selectUser = (state) => state.headerState.user;
const HomeInfo = ({ options, info, getMeal, getTimeTable }) => {
  const user = useSelector(selectUser);

  const getInfo = (e) => {
    const apiArgs = {
      ATPT_OFCDC_SC_CODE: options?.value.ATPT_OFCDC_SC_CODE,
      SD_SCHUL_CODE: options?.value.SD_SCHUL_CODE,
    };

    const timeTableOptions = {
      ATPT_OFCDC_SC_CODE: options?.value.ATPT_OFCDC_SC_CODE,
      SD_SCHUL_CODE: options?.value.SD_SCHUL_CODE,
      SCHUL_KND_SC_NM: options?.value.SCHUL_KND_SC_NM,
      grade: options?.value.grade,
      class: options?.value.class,
    };

    getMeal(apiArgs);
    getTimeTable(timeTableOptions);
  };

  return (
    <>
      {!user.snsId && <ErrorMessage>로그인이 필요합니다!</ErrorMessage>}
      {user.snsId && (
        <>
          <WelecomeMessage>
            어서오세요&nbsp;
            <div id="nickname">{user.nick}</div>님 환영합니다!
          </WelecomeMessage>
          <SchoolInfo>
            <button id="getInfoButton" onClick={getInfo}>
              새로고침
            </button>
            <NavContent>
              <div>
                <a href="#title-diet">급식</a>
              </div>
              <div>
                <a href="#title-timeTable">시간표</a>
              </div>
            </NavContent>
            <MealArea>
              <div id="title-diet">급식 - 중식</div>
              <DateAxis>
                <div>월요일</div>
                <div>화요일</div>
                <div>수요일</div>
                <div>목요일</div>
                <div>금요일</div>
              </DateAxis>
              <MealRow>
                <ul>
                  {(info.meal === null ||
                    info.meal?.lunch[0].mealDiet === null) && (
                    <div id="no-diet">메뉴를 찾지 못했습니다</div>
                  )}
                  {info.meal?.lunch[0].mealDiet &&
                    info.meal?.lunch[0].mealDiet.map((menu, index) => (
                      <li key={`${index}mon`}>{menu}</li>
                    ))}
                </ul>
                <ul>
                  {(info.meal === null ||
                    info.meal?.lunch[1].mealDiet === null) && (
                    <div id="no-diet">메뉴를 찾지 못했습니다</div>
                  )}
                  {info.meal?.lunch[1].mealDiet &&
                    info.meal?.lunch[1].mealDiet.map((menu, index) => (
                      <li key={`${index}tue`}>{menu}</li>
                    ))}
                </ul>
                <ul>
                  {(info.meal === null ||
                    info.meal?.lunch[2].mealDiet === null) && (
                    <div id="no-diet">메뉴를 찾지 못했습니다</div>
                  )}
                  {info.meal?.lunch[2].mealDiet &&
                    info.meal?.lunch[2].mealDiet.map((menu, index) => (
                      <li key={`${index}wed`}>{menu}</li>
                    ))}
                </ul>
                <ul>
                  {(info.meal === null ||
                    info.meal?.lunch[3].mealDiet === null) && (
                    <div id="no-diet">메뉴를 찾지 못했습니다</div>
                  )}
                  {info.meal?.lunch[3].mealDiet &&
                    info.meal?.lunch[3].mealDiet.map((menu, index) => (
                      <li key={`${index}thu`}>{menu}</li>
                    ))}
                </ul>
                <ul>
                  {(info.meal === null ||
                    info.meal?.lunch[4].mealDiet === null) && (
                    <div id="no-diet">메뉴를 찾지 못했습니다</div>
                  )}
                  {info.meal?.lunch[4].mealDiet &&
                    info.meal?.lunch[4].mealDiet.map((menu, index) => (
                      <li key={`${index}fri`}>{menu}</li>
                    ))}
                </ul>
              </MealRow>
              {info.meal !== null && info.meal.dinner && (
                <>
                  <div id="title">급식 - 석식</div>
                  <DateAxis>
                    <div>월요일</div>
                    <div>화요일</div>
                    <div>수요일</div>
                    <div>목요일</div>
                    <div>금요일</div>
                  </DateAxis>
                  <MealRow>
                    <ul>
                      {(info.meal === null ||
                        info.meal?.dinner[0].mealDiet === null) && (
                        <div id="no-diet">메뉴를 찾지 못했습니다</div>
                      )}
                      {info.meal?.dinner[0].mealDiet &&
                        info.meal?.dinner[0].mealDiet.map((menu, index) => (
                          <li key={`${index}mon`}>{menu}</li>
                        ))}
                    </ul>
                    <ul>
                      {(info.meal === null ||
                        info.meal?.dinner[1].mealDiet === null) && (
                        <div id="no-diet">메뉴를 찾지 못했습니다</div>
                      )}
                      {info.meal?.dinner[1].mealDiet &&
                        info.meal?.dinner[1].mealDiet.map((menu, index) => (
                          <li key={`${index}tue`}>{menu}</li>
                        ))}
                    </ul>
                    <ul>
                      {(info.meal === null ||
                        info.meal?.dinner[2].mealDiet === null) && (
                        <div id="no-diet">메뉴를 찾지 못했습니다</div>
                      )}
                      {info.meal?.dinner[2].mealDiet &&
                        info.meal?.dinner[2].mealDiet.map((menu, index) => (
                          <li key={`${index}wed`}>{menu}</li>
                        ))}
                    </ul>
                    <ul>
                      {(info.meal === null ||
                        info.meal?.dinner[3].mealDiet === null) && (
                        <div id="no-diet">메뉴를 찾지 못했습니다</div>
                      )}
                      {info.meal?.dinner[3].mealDiet &&
                        info.meal?.dinner[3].mealDiet.map((menu, index) => (
                          <li key={`${index}thu`}>{menu}</li>
                        ))}
                    </ul>
                    <ul>
                      {(info.meal === null ||
                        info.meal?.dinner[4].mealDiet === null) && (
                        <div id="no-diet">메뉴를 찾지 못했습니다</div>
                      )}
                      {info.meal?.dinner[4].mealDiet &&
                        info.meal?.dinner[4].mealDiet.map((menu, index) => (
                          <li key={`${index}fri`}>{menu}</li>
                        ))}
                    </ul>
                  </MealRow>
                </>
              )}
            </MealArea>
            <TimeTable>
              <div id="title-timeTable" name="timetableNav">
                시간표
              </div>
              <DateAxis>
                <div>월요일</div>
                <div>화요일</div>
                <div>수요일</div>
                <div>목요일</div>
                <div>금요일</div>
              </DateAxis>
            </TimeTable>
            <TimeTableRow>
              <ul>
                {!info.timeTable && (
                  <div id="no-table">시간표를 찾지 못했습니다</div>
                )}
                {info.timeTable?.time[0] &&
                  info.timeTable?.time[0].table.map((subject, index) => (
                    <li key={`${index}monSub`}>{subject}</li>
                  ))}
              </ul>
              <ul>
                {!info.timeTable && (
                  <div id="no-table">시간표를 찾지 못했습니다</div>
                )}
                {info.timeTable?.time[1] &&
                  info.timeTable?.time[1].table.map((subject, index) => (
                    <li key={`${index}tueSub`}>{subject}</li>
                  ))}
              </ul>
              <ul>
                {!info.timeTable && (
                  <div id="no-table">시간표를 찾지 못했습니다</div>
                )}
                {info.timeTable?.time[2] &&
                  info.timeTable?.time[2].table.map((subject, index) => (
                    <li key={`${index}wedSub`}>{subject}</li>
                  ))}
              </ul>
              <ul>
                {!info.timeTable && (
                  <div id="no-table">시간표를 찾지 못했습니다</div>
                )}
                {info.timeTable?.time[3] !== undefined &&
                  info.timeTable?.time[3].table.map((subject, index) => (
                    <li key={`${index}thuSub`}>{subject}</li>
                  ))}
              </ul>
              <ul>
                {!info.timeTable && (
                  <div id="no-table">시간표를 찾지 못했습니다</div>
                )}
                {info.timeTable?.time[4] !== undefined &&
                  info.timeTable?.time[4].table.map((subject, index) => (
                    <li key={`${index}friSub`}>{subject}</li>
                  ))}
              </ul>
            </TimeTableRow>
          </SchoolInfo>
        </>
      )}
    </>
  );
};

export default HomeInfo;
