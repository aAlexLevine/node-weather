import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import isZipCodeValid from './utils/zipCodeValidation';
import NavigationBar from './NavigationBar';
import Search from './Search';
import Footer from './Footer';
import FavoritesList from './FavoritesList';
import WeatherCard from './WeatherCard';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([{}, {}, {}]);
  const [isFavoritesVisible, setIsFavoritesVisible] = useState(false);
  const [isWeatherVisible, setIsWeatherVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchWeatherByZip = (zip) => {
    axios.get('/api/main/getWeatherByZip', { params: { zip } })
      .then((results) => {
        setWeatherData(results.data);
        console.log('response:', results.data, 'weather:', weatherData);
      })
      .catch((err) => console.log('Error: Failed to fetch weather', err));
  };

  const getAllFavoriteZips = () => {
    axios.get('/api/main/getAllFavoriteZips')
      .then((results) => setFavorites(results.data))
      .catch((err) => console.log('Error: Failed to fetch favorites', err));
  };

  const addZipToFavorites = () => {};

  const removeZipFromFavorites = () => {};

  const showFavorites = () => setIsFavoritesVisible(true);

  const hideFavorites = () => setIsFavoritesVisible(false);

  const showWeather = () => setIsWeatherVisible(true);

  const hideWeather = () => setIsWeatherVisible(false);

  const filterFavorties = (searchTerm) => {
    //map zipcodes to strings
    //iterate thru aray, if zipstrings include search term, return those zipstrings
    //update favorits with filtered array

  };

  const handleSearchSubmit = (event, zip = searchTerm) => {
    event.preventDefault();
    console.log('subtmie search');
    if (isZipCodeValid(zip)) {
      fetchWeatherByZip(zip);
      setSearchTerm('');
      hideWeather();
      hideFavorites();
    }
  };

  useEffect(() => {
    // getAllFavoriteZips();
  }, []);

  useEffect(() => {
    if (weatherData !== null) {
      console.log('useEffect weatherData:', weatherData);
      console.log('weatherData !== null');
      showWeather();
    }
  }, [weatherData]);

  useEffect(() => {
    //every time searchterm is updated,
    //update apps display of favorites with filtered list
    if (searchTerm.length === 0) {
      hideFavorites();
    } else if (searchTerm.length > 0) {
      showFavorites();
      // filterFavoritesList(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div className="container">
      <NavigationBar>
        <Search
          handleSearchSubmit={handleSearchSubmit}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
      </NavigationBar>
      <Footer>
        {isFavoritesVisible && (
          <FavoritesList
            favorites={favorites}
            handleSearchSubmit={handleSearchSubmit}
          />
        )}
        {isWeatherVisible && (
          <WeatherCard
            weatherData={weatherData}
          />
        )}
      </Footer>
    </div>
  );
};

export default App;
