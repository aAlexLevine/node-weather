import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const setup = () => render(<App />);

describe('App initial render', () => {
  it('renders App component', () => {
    setup()
  });

  it('displays zip code Search', () => {
    setup()
    expect(screen.getByLabelText('Zip Code')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Search'})).toBeInTheDocument();
  });

  it('does not display FavoritesList on initial render', () => {
    setup()
    expect(screen.queryByTestId('favoritesList')).toBeNull();

  })

  it('does not display WeatherCard on initial render', () => {
    expect(screen.queryByTestId('weatherCard')).toBeNull();
  });

  // screen.debug();
});



// describe(Integration tests)



//use this instead of fire event
// userEvent.type(input, 'hello world');
