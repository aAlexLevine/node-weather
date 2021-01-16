import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritesList from './FavoritesList';

const setup = () => {
  const favorites = [
    { name: 'New York', zip: '10001' },
    { name: 'Miami', zip: '33101' },
  ];
  const clickHandler = jest.fn(); //.mockImplementation((e) => e.preventDefault());
  const utils = render(
    <FavoritesList
      favorites={favorites}
      handleSearchSubmit={clickHandler}
      removeZipFromFavorites={clickHandler}
    />
  );
  return {
    clickHandler,
  };
};

describe('FavoritesList', () => {
  it('renders FavoritesList', () => {
    setup();
  });

  it('contains list items', () => {
    setup();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('Miami')).toBeInTheDocument();
  });

  it('list item fires click handler on click', () => {
    const { clickHandler } = setup();
    userEvent.click(screen.getByText('New York'));
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });


  it('list items contain delete button', () => {
    const { clickHandler } = setup();
    const list = screen.getByTestId('favoritesList');
    const buttons = within(list).getAllByRole('button', { name: 'X' });
    expect(buttons.length).toBe(2);
    expect(buttons[0]).toHaveTextContent('X');
    expect(buttons[1]).toHaveTextContent('X');
    userEvent.click(buttons[0]);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it('list items contain name and zip', () => {
    setup();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('10001')).toBeInTheDocument();
    expect(screen.getByText('Miami')).toBeInTheDocument();
    expect(screen.getByText('33101')).toBeInTheDocument();
  });
});
