import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import HeaderContainer from '../components/HeaderContainer';

const ErrorMessage = styled.div`
  margin: auto;
  width: 50%;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  padding-top: 100px;
`;

const OptionForm = styled.div`
  padding-top: 80px;
  margin: auto;
  width: 60%;
  align-items: center;
`;

const SchoolName = styled.div`
  display: flex;
`;

const SCName = styled.div`
  align-self: center;
  font-size: 25px;
  border-right: solid gray 2px;
  padding-right: 25px;
`;

const SCNInputForm = styled.div`
  padding-left: 27px;
  flex: 2;

  align-items: center;

  display: flex;

  & input {
    flex: 4;
    height: 35px;
    font-size: 20px;
    border-radius: 0%;
    border: solid gray 2px;
  }

  & button {
    flex: 0.5;
    align-self: center;
    font-size: 20px;
    font-weight: bold;
    color: white;
    border: none;
    background-color: #61aaff;
    margin-left: 25px;
    height: 35px;
    cursor: pointer;
  }

  & button:hover {
    background-color: blue;
  }
`;

const SchoolListView = styled.div`
  padding-top: 25px;

  & ul {
    list-style: none;
  }

  & ul li {
    padding-bottom: 20px;
    display: flex;
  }

  & ul li button {
    flex: 0.5;
    font-size: 20px;
    font-weight: bold;
    color: white;
    border: none;
    background-color: orange;
    margin-left: 25px;
    cursor: pointer;
  }

  & ul li button:hover {
    background-color: red;
  }

  #selected {
    flex: 0.5;
    font-size: 20px;
    font-weight: bold;
    color: #61aaff;
  }
`;

const SchoolListDetail = styled.div`
  flex: 4;

  #school_name {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 5px;
  }
`;

const SearchError = styled.div`
  padding-top: 25px;

  #error_message {
    font-weight: bold;
    font-size: 20px;
    color: red;
    text-align: center;
  }
`;

const SchoolGradeAndClass = styled.div`
  padding-top: 25px;
  display: flex;
`;

const SchoolGrade = styled.div`
  flex: 1;
  display: flex;

  #title_grade {
    align-self: center;
    font-size: 25px;
    padding-left: 25px;
    padding-right: 25px;
    border-right: solid gray 2px;
  }

  #input_grade {
    text-align: center;
    width: 70%;
    margin-left: 27px;
    height: 35px;
    font-size: 20px;
    border-radius: 0%;
    border: solid gray 2px;
  }
`;

const SchoolClass = styled.div`
  flex: 1;
  display: flex;

  #title_class {
    align-self: center;
    font-size: 25px;
    padding-left: 25px;
    padding-right: 25px;
    border-right: solid gray 2px;
  }

  #input_class {
    text-align: center;
    width: 70%;
    margin-left: 27px;
    height: 35px;
    font-size: 20px;
    border-radius: 0%;
    border: solid gray 2px;
  }
`;

const SubmitButton = styled.div`
  padding-top: 100px;
  & button {
    width: 100%;
    color: #61aaff;
    background-color: white;
    font-size: 25px;
    font-weight: bold;
    padding-top: 15px;
    padding-bottom: 15px;
    border-radius: 10px;
    border: solid 2px #61aaff;
    cursor: pointer;
  }

  & button:hover {
    background-color: #61aaff;
    color: white;
  }
`;

const ApplyResult = styled.div`
  padding-top: 50px;

  text-align: center;
  font-weight: bold;
  font-size: 20px;

  #success {
    color: #61aaff;
  }
  #failure {
    color: red;
  }
`;

const selectUser = (state) => state.headerState.user;

const Options = ({
  scnChange,
  searchSchool,
  schoolList,
  schoolSelect,
  searchName,
  changePersonalInfo,
  submitSchool,
  gradeAndclass,
  applyOption,
  isSuccess,
}) => {
  const user = useSelector(selectUser);

  const changeInput = (e) => {
    scnChange({ value: e.target.value });
  };

  const changePersonal = (e) => {
    changePersonalInfo({ name: e.target.name, value: e.target.value });
  };

  const enterPress = (e) => {
    if (e.key === 'Enter') searchSchool(searchName);
  };

  const selectSchool = (e) => {
    schoolSelect({
      school: schoolList.schoolNameList[parseInt(e.target.name)],
    });
  };

  const optionReq = (e) => {
    const reqParameter = {
      ATPT_OFCDC_SC_CODE: submitSchool.ATPT_OFCDC_SC_CODE,
      SD_SCHUL_CODE: submitSchool.SD_SCHUL_CODE,
      SCHUL_NM: submitSchool.SCHUL_NM,
      ORG_RDNMA: submitSchool.ORG_RDNMA,
      SCHUL_KND_SC_NM: submitSchool.SCHUL_KND_SC_NM,
      grade: gradeAndclass.grade,
      class: gradeAndclass.class,
    };
    applyOption(reqParameter);
  };

  return (
    <>
      <HeaderContainer />
      {!user.snsId && <ErrorMessage>로그인이 필요합니다!</ErrorMessage>}
      {user.snsId && (
        <>
          <OptionForm>
            <SchoolName>
              <SCName>학교명</SCName>
              <SCNInputForm>
                <input
                  type="text"
                  name="schoolInfo"
                  onChange={changeInput}
                  onKeyPress={enterPress}
                  autoComplete="off"
                />
                <button onClick={() => searchSchool(searchName)}>검색</button>
              </SCNInputForm>
            </SchoolName>
            {schoolList !== null && !schoolList.schoolNameList[0].ERROR && (
              <SchoolListView>
                <ul>
                  {schoolList.schoolNameList.map((info, index) => (
                    <li key={index}>
                      <SchoolListDetail>
                        <div id="school_name">{info.SCHUL_NM}</div>
                        {info.ORG_RDNMA}
                      </SchoolListDetail>
                      {!info.isSelected && (
                        <button name={index} onClick={selectSchool}>
                          확인
                        </button>
                      )}
                      {info.isSelected && <div id="selected">선택됨</div>}
                    </li>
                  ))}
                </ul>
              </SchoolListView>
            )}
            {schoolList !== null && schoolList.schoolNameList[0].ERROR && (
              <SearchError>
                <div id="error_message">
                  {schoolList.schoolNameList[0].ERROR}
                </div>
              </SearchError>
            )}
            <SchoolGradeAndClass>
              <SchoolGrade>
                <div id="title_grade">학년</div>
                <input
                  id="input_grade"
                  name="grade"
                  type="text"
                  value={gradeAndclass.grade}
                  onChange={changePersonal}
                  autoComplete="off"
                />
              </SchoolGrade>
              <SchoolClass>
                <div id="title_class">반</div>
                <input
                  id="input_class"
                  name="class"
                  type="text"
                  value={gradeAndclass.class}
                  onChange={changePersonal}
                  autoComplete="off"
                />
              </SchoolClass>
            </SchoolGradeAndClass>
            {submitSchool.SD_SCHUL_CODE &&
              gradeAndclass.grade !== '' &&
              gradeAndclass.class !== '' && (
                <SubmitButton>
                  <button onClick={optionReq}>적용하기</button>
                </SubmitButton>
              )}
            {isSuccess?.value && (
              <ApplyResult>
                <div id="success">적용이 완료되었습니다</div>
              </ApplyResult>
            )}
            {!isSuccess?.value && isSuccess !== null && (
              <ApplyResult>
                <div id="failure">적용하는데 실패하였습니다</div>
              </ApplyResult>
            )}
          </OptionForm>
        </>
      )}
    </>
  );
};

export default Options;
