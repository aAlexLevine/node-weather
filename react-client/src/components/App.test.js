import React from 'react';
import { render, screen, act, waitFor, within } from '@testing-library/react';
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
  it('displays favorites when search input is focused', async () => {
    setup();
    await act(() => axios());
    const input = screen.getByLabelText('Zip Code');
    input.focus();
    expect(screen.getByTestId('favoritesList')).toBeInTheDocument();

    userEvent.type(screen.getByLabelText('Zip Code'), '3');
    userEvent.clear(screen.getByLabelText('Zip Code'));
    expect(screen.getByTestId('favoritesList')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.queryByTestId('favoritesList')).toBeNull();
  });

  it('hides favorites when search input is unfocused', async () => {
    setup();
    await act(() => axios());
    userEvent.type(screen.getByLabelText('Zip Code'), '345');
    userEvent.click(screen.getByLabelText('Toggle navigation'));
    expect(screen.queryByTestId('favoritesList')).toBeNull;
  });

  it('keeps favorites displayed when deleting location', async () => {
    setup();
    await act(() => axios());
    userEvent.type(screen.getByLabelText('Zip Code'), '999');
    const list = screen.getByTestId('favoritesList');
    const buttons = within(list).getAllByRole('button', { name: 'X' });
    expect(buttons.length).toBe(2);
    userEvent.click(buttons[0]);
    await act(() => axios());
    expect(screen.getByTestId('favoritesList')).toBeInTheDocument();
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

  it('hides weather on unsuccessful submit', async () => {
    setup();
    await act(() => axios());
    userEvent.type(screen.getByLabelText('Zip Code'), '888');
    userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.queryByTestId('weatherCard')).toBeNull();
  });
});
