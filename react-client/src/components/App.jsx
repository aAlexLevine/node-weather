import React, { useState, useEffect } from 'react';
import axios from 'axios';
import isZipCodeValid from './utils/zipCodeValidation';
import sortByName from './utils/sortByName';
import NavigationBar from './NavigationBar';
import Search from './Search';
import Footer from './Footer';
import FavoritesList from './FavoritesList';
import WeatherCard from './WeatherCard';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isWeatherVisible, setIsWeatherVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isFavoritesVisible, setIsFavoritesVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // getAllFavoriteZips();
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

  const getAllFavoriteZips = () => {
    axios
      .get('/api/main/getAllFavoriteZips')
      .then((results) => {
        const sorted = sortByName(results.data);
        setFavorites(sorted);
      })
      .catch((err) => console.log('Error: Failed to fetch favorites', err));
  };

  const addToFavorites = (zip, name) => {
    axios
      .post('/api/main/addToFavorites', { zip, name })
      .then(({ data: { insertId } }) => {
        setFavorites((prevFavorites) => {
          const addedFavorites = [...prevFavorites, { zip, name, insertId }];
          return sortByName(addedFavorites);
        });
      })
      .catch((err) => console.log('Error: Failed to add to favorites', err));
  };
  // "start": "npm run build && nodemon server/index.js",----------------------------
  const removeZipFromFavorites = (zip) => {
    axios
      .post('/api/main/removeFromFavorites', { zip })
      .then(() => {
        setFavorites((prevFavorites) => {
          const removedFavorites = prevFavorites.filter(
            (fav) => fav.zip !== zip
          );
          return removedFavorites;
        });
      })
      .catch((err) =>
        console.log('Error: Failed to remove from favorites', err)
      );
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
