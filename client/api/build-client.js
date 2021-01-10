import axios from 'axios';

const buildClient = ({ req }) => {
  console.log('Starting...');

  if (typeof window === 'undefined') {
    // We are on the server
    return axios.create({
      baseURL: 'http://www.weather-app-prod.xyz/',
      headers: req.headers,
    });
  } else {
    // We are on the browser
    return axios.create({
      baseURL: '/',
    });
  }
};

export default buildClient;
