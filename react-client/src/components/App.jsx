import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import isZipCodeValid from './utils/zipCodeValidation';
import NavigationBar from './NavigationBar';
import Search from './Search';
import Footer from './Footer';
import FavoritesList from './FavoritesList';
import WeatherCard from './WeatherCard';
import useFavorites from './useFavorites';

const App = () => {
  const inputRef = useRef();
  const favoritesListRef = useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isWeatherVisible, setIsWeatherVisible] = useState(false);
  const [isFavoritesVisible, setIsFavoritesVisible] = useState(false);
  const [error, setError] = useState({ hasError: false, errMessage: '' });
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
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const fetchWeatherByZip = (zip) => {
    axios
      .get('/api/main/getWeatherByZip', { params: { zip } })
      .then((results) => setWeatherData(results.data))
      .catch((err) =>
        setError({ hasError: true, errMessage: err.response.statusText })
      );
  };

  const handleSearchSubmit = (event, zip = searchTerm) => {
    event.preventDefault();
    inputRef.current.blur();
    hideWeather();
    if (isZipCodeValid(zip)) {
      fetchWeatherByZip(zip);
      setSearchTerm('');
      hideFavorites();
    } else {
      setError({ hasError: true, errMessage: 'Must be 5 digits' });
    }
  };

  const handleClickOutside = (event) => {
    const isListItem = favoritesListRef.current?.contains(event.target);
    const isInputEl = inputRef.current.contains(event.target);
    if (!isInputEl && !isListItem) {
      hideFavorites(event);
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
          showFavorites={showFavorites}
          inputRef={inputRef}
          error={error}
          setError={setError}
        />
      </NavigationBar>
      <Footer>
        {isFavoritesVisible && (
          <FavoritesList
            favorites={favorites}
            handleSearchSubmit={handleSearchSubmit}
            removeZipFromFavorites={removeZipFromFavorites}
            favoritesListRef={favoritesListRef}
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
