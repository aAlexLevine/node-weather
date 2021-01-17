import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';

const setup = () => render(<App />);

const server = setupServer(
  rest.get('http://localhost:3000/api/main/getAllFavoriteZips', (req, res, ctx) => {
    res(ctx.json({ test: 'mock response' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  it('renders App component', () => {
    setup();
  });

  it('displays zip code Search', () => {
    setup();
    expect(screen.getByLabelText('Zip Code')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('does not display FavoritesList on initial render', () => {
    setup();
    expect(screen.queryByTestId('favoritesList')).toBeNull();
  });

  it('does not display WeatherCard on initial render', () => {
    expect(screen.queryByTestId('weatherCard')).toBeNull();
  });
});

// describe(App Integration tests)
