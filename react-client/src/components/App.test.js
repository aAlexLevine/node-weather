import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from './App';

const setup = () => render(<App />);

describe('App', () => {
  it('renders App component', async () => {
    setup();

    // Required even if no tests/changes because the request happens on mount
    await act(() => axios());
  });

  it('displays zip code Search', async () => {
    setup();
    await act(() => axios());
    expect(screen.getByLabelText('Zip Code')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('does not display FavoritesList initially', async () => {
    setup();
    await act(() => axios());
    expect(screen.queryByTestId('favoritesList')).toBeNull();
  });

  it('does not display WeatherCard initially', async () => {
    await act(() => axios());
    expect(screen.queryByTestId('weatherCard')).toBeNull();
  });
});

describe('App interactions', () => {
  it('displays favorites when typing in search', async () => {
    setup();
    await act(() => axios());
    userEvent.type(screen.getByLabelText('Zip Code'), '3');
    expect(screen.getByTestId('favoritesList')).toBeInTheDocument();

    userEvent.clear(screen.getByLabelText('Zip Code'));
    expect(screen.queryByTestId('favoritesList')).toBeNull();
  });

  it('hides favorites on successful submit', async () => {
    setup();
    userEvent.type(screen.getByLabelText('Zip Code'), '10001');
    userEvent.click(screen.getByRole('button', { name: 'Search' }));
    await act(() => axios());
    expect(screen.queryByTestId('favoritesList')).toBeNull();
  });

  it('displays weather on successful submit', async () => {
    setup();
    userEvent.type(screen.getByLabelText('Zip Code'), '10001');
    userEvent.click(screen.getByRole('button', { name: 'Search' }));
    await waitFor(() => screen.getByTestId('weatherCard'));
    expect(screen.getByTestId('weatherCard')).toBeInTheDocument();
  });
});
