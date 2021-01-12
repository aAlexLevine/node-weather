import React from 'react';
import PropTypes from 'prop-types';

const FavoritesList = ({ favorites, handleSearchSubmit }) => {
  const handleClickDelete = (event) => {
    event.stopPropagation();
    console.log('delete');
  };

  return (
    <ul className="list-group" data-testid="favoritesList">
      {favorites.map((location, i) => (
        <div
          className="list-group-item list-group-item-action"
          role="button"
          tabIndex="0"
          key={i} //***make this unique */
          onClick={(event) => handleSearchSubmit(event, zip)}
          onKeyPress={(event) => handleSearchSubmit(event, zip)}
        >
          Miami Beach Florida
          {/* {location.name} */}
          <button
            type="button"
            className="btn btn-default"
            style={{
              display: 'inline',
              float: 'right',
            }}
          >
            X
          </button>
        </div>
      ))}
    </ul>
  );
};

FavoritesList.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  handleSearchSubmit: PropTypes.func.isRequired,
};

export default FavoritesList;
