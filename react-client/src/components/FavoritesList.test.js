import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritesList from './FavoritesList';

import userEvent from '@testing-library/user-event';

const setup = () => {
  const favorites = [{}, {}, {}]
  const handleSearchSubmit = jest
    .fn()
    .mockImplementation((e) => e.preventDefault());
  const utils = render(<FavoritesList favorites={favorites} handleSearchSubmit={handleSearchSubmit} />);
  return {
    handleSearchSubmit,
  };
};
