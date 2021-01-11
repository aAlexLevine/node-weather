require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.OPEN_WEATHER_API_KEY;
const units = 'imperial';

const getWeatherByZip = (zip) => (
  axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}&units=${units}`)
    .then((results) => results)
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
      } else if (err.request) {
        console.log('Error: Server received no response from OpenWeatherMap', err.request);
      } else {
        console.log('Error:', err.message);
      }
      return null;
    }));

module.exports = {
  getWeatherByZip,
};
