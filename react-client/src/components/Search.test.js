import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Search from './Search';

const setup = (searchTerm = '') => {
  const handleSearchSubmit = jest
    .fn()
    .mockImplementation((e) => e.preventDefault());
  const setSearchTerm = jest.fn();
  const utils = render(
    <Search
      handleSearchSubmit={handleSearchSubmit}
      setSearchTerm={setSearchTerm}
      searchTerm={searchTerm}
    />
  );
  return {
    handleSearchSubmit,
    setSearchTerm,
  };
};

describe('Search', () => {
  it('renders Search', () => {
    setup();
  });

  it('contains Zip Code input and Search button', () => {
    setup();
    expect(screen.getByLabelText('Zip Code')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('calls change handler when typing', () => {
    const { setSearchTerm } = setup();
    userEvent.type(screen.getByLabelText('Zip Code'), '0123');
    expect(setSearchTerm).toHaveBeenCalledTimes(4);
  });

  it('gets its value from props', () => {
    setup('10001');
    expect(screen.getByLabelText('Zip Code').value).toBe('10001');
  });

  it('returns input as a string', () => {
    setup('10001');
    expect(typeof screen.getByLabelText('Zip Code').value).toBe('string');
    expect(screen.getByLabelText('Zip Code').type).toBe('text');
  });

  it('does not allow more than 5 characters', () => {
    setup();
    expect(screen.getByLabelText('Zip Code').maxLength).toBe(5);
  });

  it('handles submit', () => {
    const { handleSearchSubmit } = setup();
    userEvent.click(screen.getByText('Search'));
    expect(handleSearchSubmit).toHaveBeenCalledTimes(1);
  });
});
