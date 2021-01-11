const express = require('express');
const openWeatherAPI = require('./helpers/openWeather');

const router = express.Router();

router.get('/getWeatherByZip', (req, res) => {
  const { zip } = req.query;
  openWeatherAPI.getWeatherByZip(zip)
    .then((results) => {
      if (!results) {
        res.statusMessage = 'city not found';
        res.sendStatus(404).end();
        return;
      }
      res.send(results.data);
    })
    .catch((err) => {
      console.log('Error: Server could not retrieve weather', err);
    });
});

module.exports = router;
