import React from 'react';
import PropTypes from 'prop-types';

const Search = ({
  handleSearchSubmit,
  setSearchTerm,
  searchTerm,
}) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form className="form-inline my-2 my-lg-0" _lpchecked="1">
      <input
        className="form-control mr-sm-2"
        type="text"
        placeholder="Zip Code"
        aria-label="Zip Code"
        maxLength="5"
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
