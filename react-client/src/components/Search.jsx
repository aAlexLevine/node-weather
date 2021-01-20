import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ handleSearchSubmit, setSearchTerm, searchTerm }) => {
  const handleChange = (event) => {
    const currentTerm = event.target.value
    const isTermValid = event.target.validity.valid
    if (isTermValid) {
      setSearchTerm(currentTerm)
    } 
  };

  return (
    <form
      className="form-inline my-2 my-lg-0"
      _lpchecked="1"
      data-testid="zipCodeForm"
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
      />
      <button
        className="btn btn-outline-success my-2 my-sm-0"
        type="submit"
        onClick={handleSearchSubmit}
      >
        Search
      </button>
    </form>
  );
};

Search.propTypes = {
  handleSearchSubmit: PropTypes.func.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default Search;
