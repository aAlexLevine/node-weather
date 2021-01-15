import React from 'react';
import PropTypes from 'prop-types';

const FavoritesList = ({
  favorites,
  handleSearchSubmit,
  removeZipFromFavorites,
}) => {
  const handleClickDelete = (event, zip) => {
    event.stopPropagation();
    removeZipFromFavorites(zip);
  };

  return (
    <ul className="list-group" data-testid="favoritesList">
      {favorites.map(({ name, zip }) => (
        <div
          className="list-group-item list-group-item-action"
          role="button"
          tabIndex="0"
          key={zip}
          onClick={(event) => handleSearchSubmit(event, zip)}
          onKeyPress={(event) => handleSearchSubmit(event, zip)}
        >
          <div className="row">
            <div className="col-sm-4">{name}</div>
            <div className="col-sm-4">{zip}</div>

            <div className="col-sm-4">
              <button
                type="button"
                className="btn btn-default"
                onClick={(event) => handleClickDelete(event, zip)}
                style={{
                  display: 'inline',
                  float: 'right',
                }}
              >
                X
              </button>
            </div>
          </div>
        </div>
      ))}
    </ul>
  );
};

FavoritesList.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSearchSubmit: PropTypes.func.isRequired,
  removeZipFromFavorites: PropTypes.func.isRequired,
};

export default FavoritesList;
