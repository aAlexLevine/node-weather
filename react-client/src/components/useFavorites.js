import React, { useState } from 'react';
import axios from 'axios';

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const requestMainAPI = (endPoint, method, body) => {
    const options = {
      url: `/api/main/${endPoint}`,
      method,
      data: body,
    };

    axios(options)
      .then(({ data }) => setFavorites(data))
      .catch((err) => console.log(`Error: ${endPoint} request failed`, err));
  };

  const getAllFavoriteZips = () => {
    requestMainAPI('getAllFavoriteZips', 'GET');
  };

  const addToFavorites = (zip, name) => {
    requestMainAPI('addToFavorites', 'POST', { zip, name });
  };

  const removeZipFromFavorites = (zip) => {
    requestMainAPI('removeFromFavorites', 'POST', { zip });
  };

  return {
    favorites,
    getAllFavoriteZips,
    addToFavorites,
    removeZipFromFavorites,
  };
};

export default useFavorites;
