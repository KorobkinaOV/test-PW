import axios from 'axios';
import { getToastrMessage } from 'actions';
import store from 'store';

const baseUrl = 'http://193.124.114.46:3001';

const errorCatching = (error) => {
  store.dispatch(getToastrMessage({type: 'error', message: error.response.data }));
  return error;
}

const getOptions = () => {
  return {
    credentials: 'same-origin',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: ` Bearer ${localStorage.getItem('token')}`
    }
  }
};

export const postRequest = (url) => (body) => {
  return axios.post(`${baseUrl}${url}`, body)
    .then(res => {
        return res.data
    })
    .catch(error => {
        return errorCatching(error);
    })
};

export const secureRequest = (url) => {
  return axios.get(`${baseUrl}${url}`, getOptions())
    .then(res => {
        return res.data;
    })
    .catch(error => {
        return errorCatching(error);
    })
};

export const securePostRequest = (url) => (body) => {
  return axios.post(`${baseUrl}${url}`, body, {
      ...getOptions()
  })
      .catch(error => {
          return errorCatching(error);
      })
};