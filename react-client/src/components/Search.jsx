import React from 'react';
import PropTypes from 'prop-types';

const Search = ({
  handleSearchSubmit,
  setSearchTerm,
  searchTerm,
  showFavorites,
  inputRef,
  error: { hasError, errMessage },
  setError,
}) => {
  const handleChange = (event) => {
    const currentTerm = event.target.value;
    const isTermValid = event.target.validity.valid;
    if (isTermValid) {
      setSearchTerm(currentTerm);
    }
  };

  const handleFocus = () => {
    showFavorites();
    if (hasError) {
      setError({ hasError: false, errMessage: '' });
    }
  };

  return (
    <div>
      <form
        className="form-inline my-2 my-lg-0 position-relative novalidate"
        _lpchecked="1"
        data-testid="zipCodeForm"
        onSubmit={handleSearchSubmit}
      >
        <input
          className={`form-control mr-sm-2 ${hasError && 'is-invalid'}`}
          type="text"
          placeholder="Zip Code"
          aria-label="Zip Code"
          maxLength="5"
          pattern="[0-9]*"
          value={searchTerm}
          onChange={handleChange}
          onFocus={handleFocus}
          ref={inputRef}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
        <div className="invalid-tooltip">{errMessage}</div>
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
  error: PropTypes.oneOfType([
    PropTypes.shape({
      hasError: PropTypes.bool,
      errMessage: PropTypes.string,
    }),
    PropTypes.oneOf([null]),
  ]).isRequired,
  setError: PropTypes.func.isRequired,
};

export default Search;
