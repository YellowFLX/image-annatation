import axios from 'axios';

const ApiURL = 'http://localhost:8080'


export const fileApi = axios.create({
  baseURL: `${ApiURL}/images/`,
  headers: {
    "Content-Type": "application/json"
  }
})

