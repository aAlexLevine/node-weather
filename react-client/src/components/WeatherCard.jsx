import React from 'react';
import PropTypes from 'prop-types';

const WeatherCard = ({ weatherData, addToFavorites, favorites }) => {
  const {
    weather,
    main: { temp, pressure, humidity },
    wind: { speed },
    name,
    zip,
  } = weatherData;
  const [{ main: mainCondition, icon }] = weather;
  const temperature = Math.round(temp);

  const handleClickAdd = () => {
    addToFavorites(zip, name);
  };

  const isSaved = () => favorites.some((fav) => fav.zip === zip);

  return (
    <div data-testid="weatherCard">
      <p contentEditable="true" spellcheckker="false" />
      <div className="card" style={{ marginTop: '30px' }}>
        <div className="card" style={{ marginTop: '0px' }}>
          <div className="card-body" style={{ marginTop: '0px' }}>
            <h4 className="card-title">
              <b>{name}</b>
            </h4>
            <div className="row">
              <div className="col-sm-4">
                <div className="row">
                  <div className="col">
                    <h1>{`${temperature}°`}</h1>
                    <h6>{mainCondition}</h6>
                  </div>
                  <div className="col">
                    <img
                      alt="icon"
                      src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-4 col-5" />
              <div className="col-sm-4">
                <h5>{`Pressure ${pressure} hPa`}</h5>
                <h5>{`Humidity ${humidity}%`}</h5>
                <h5>{`Wind ${speed} mph`}</h5>
                <div className="row">
                  <div className="col-sm-4" />
                  <div className="col-sm-4 col-5" />
                  <div className="col-sm-4" />
                </div>
              </div>
            </div>
            {isSaved() ? (
              <button className=" btn:disabled" type="button" disabled>
                Saved
              </button>
            ) : (
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleClickAdd}
              >
                Add to favorites
              </button>
            )}
          </div>
        </div>
      </div>
      © Firstly NodeJS 2021
    </div>
  );
};

WeatherCard.propTypes = {
  weatherData: PropTypes.shape({
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        main: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      }),
    ).isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
  }).isRequired,
  addToFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WeatherCard;
