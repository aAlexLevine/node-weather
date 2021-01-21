const express = require('express');
const db = require('../database-mysql');
const openWeatherAPI = require('./helpers/openWeather');

const router = express.Router();

router.get('/getWeatherByZip', (req, res) => {
  const { zip } = req.query;
  openWeatherAPI
    .getWeatherByZip(zip)
    .then((results) => {
      if (!results) {
        res.statusMessage = 'city not found';
        res.sendStatus(404).end();
        return;
      }
      const weatherWithZip = {
        ...results.data,
        zip,
      };
      res.send(weatherWithZip);
    })
    .catch((err) => {
      console.log('Error: Server could not retrieve weather', err);
    });
});

router.get('/getAllFavoriteZips', (req, res) => {
  db.getAllFavoriteZips()
    .then((zips) => res.send(zips))
    .catch((err) => console.log('Error: Server could not retrieve favorites', err));
});

router.post('/addToFavorites', (req, res) => {
  const zipData = req.body;
  db.addToFavorites(zipData)
    .then(() => {
      db.getAllFavoriteZips().then((zips) => res.send(zips));
    })
    .catch((err) => {
      res.send(err);
      console.log('Error: Server could not add to favorites', err);
    });
});

router.post('/removeFromFavorites', (req, res) => {
  const zip = req.body;
  db.removeFromFavorites(zip)
    .then(() => {
      db.getAllFavoriteZips()
      .then((zips) => res.send(zips));
    })
    .catch((err) => {
      res.send(err);
      console.log('Error: Server could not retrieve favorites', err);
    });
});

module.exports = router;
