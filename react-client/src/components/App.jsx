import React, { useState, useEffect } from 'react';
import axios from 'axios';
import isZipCodeValid from './utils/zipCodeValidation';
import NavigationBar from './NavigationBar';
import Search from './Search';
import Footer from './Footer';
import FavoritesList from './FavoritesList';
import WeatherCard from './WeatherCard';
import useFavorites from './useFavorites';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isWeatherVisible, setIsWeatherVisible] = useState(false);
  const [isFavoritesVisible, setIsFavoritesVisible] = useState(false);
  const {
    favorites,
    getAllFavoriteZips,
    addToFavorites,
    removeZipFromFavorites,
  } = useFavorites();


  useEffect(() => {
    getAllFavoriteZips();
  }, []);

  useEffect(() => {
    if (weatherData !== null) {
      showWeather();
    }
  }, [weatherData]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      hideFavorites();
    } else if (searchTerm.length > 0) {
      showFavorites();
    }
  }, [searchTerm]);

  const fetchWeatherByZip = (zip) => {
    axios
      .get('/api/main/getWeatherByZip', { params: { zip } })
      .then((results) => setWeatherData(results.data))
      .catch((err) => console.log('Error: Failed to fetch weather', err));
  };

  const handleSearchSubmit = (event, zip = searchTerm) => {
    event.preventDefault();
    if (isZipCodeValid(zip)) {
      fetchWeatherByZip(zip);
      setSearchTerm('');
      hideWeather();
      hideFavorites();
    }
  };

  const showFavorites = () => setIsFavoritesVisible(true);

  const hideFavorites = () => setIsFavoritesVisible(false);

  const showWeather = () => setIsWeatherVisible(true);

  const hideWeather = () => setIsWeatherVisible(false);

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
            removeZipFromFavorites={removeZipFromFavorites}
          />
        )}
        {isWeatherVisible && (
          <WeatherCard
            weatherData={weatherData}
            addToFavorites={addToFavorites}
            favorites={favorites}
          />
        )}
      </Footer>
    </div>
  );
};

export default App;
