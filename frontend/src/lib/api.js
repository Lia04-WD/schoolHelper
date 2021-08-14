import axios from 'axios';

export const getUser = () => axios.post('/auth/getDefaultUserInfo');

export const logout = () => axios.get('/auth/logout');

export const searchSchool = (schoolName) =>
  axios.post(`/option/searchSchool`, { name: schoolName });

export const optionRequest = (args) =>
  axios.post('/option/apply', { SchoolInfo: args });

export const getOptions = () => axios.post('/option/getOptions');

export const getMeal = (args) => axios.post('/school/getMeal', args);

export const getTimeTable = (args) => axios.post('/school/getTimeTable', args);
