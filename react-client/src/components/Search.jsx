import React from 'react';
import PropTypes from 'prop-types';

const Search = ({
  handleSearchSubmit,
  setSearchTerm,
  searchTerm,
  showFavorites,
  inputRef,
}) => {
  const handleChange = (event) => {
    const currentTerm = event.target.value;
    const isTermValid = event.target.validity.valid;
    if (isTermValid) {
      setSearchTerm(currentTerm);
    }
  };

  return (
    <div>
      <form
        className="form-inline my-2 my-lg-0"
        _lpchecked="1"
        data-testid="zipCodeForm"
        onSubmit={handleSearchSubmit}
      >
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Zip Code"
          aria-label="Zip Code"
          maxLength="5"
          pattern="[0-9]*"
          value={searchTerm}
          onChange={handleChange}
          onFocus={showFavorites}
          ref={inputRef}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

Search.propTypes = {
  handleSearchSubmit: PropTypes.func.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  showFavorites: PropTypes.func.isRequired,
  inputRef: PropTypes.shape({}).isRequired,
};

export default Search;
