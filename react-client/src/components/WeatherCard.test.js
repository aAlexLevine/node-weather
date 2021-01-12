import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import WeatherCard from './WeatherCard';

const setup = () => {
  const handleSearchSubmit = jest
    .fn()
    .mockImplementation((e) => e.preventDefault());
  const utils = render(<WeatherCard weatherData={weatherData} />);
  return {
    handleSearchSubmit,
  };
};

const weatherData = {
  weather: [
    {
      main: 'Clear',
      icon: '01n',
    },
  ],
  main: {
    temp: 34.3,
    pressure: 1021,
    humidity: 60,
  },
  wind: {
    speed: 4.61,
  },
  name: 'New York',
};

describe('WeatherCard', () => {
  it('renders WeatherCard', () => {
    setup();
  });

  it('displays required data points', () => {
    setup();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('34°')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
    expect(screen.getByAltText('icon')).toBeInTheDocument();
    expect(screen.getByAltText('icon')).toHaveAttribute(
      'src',
      'http://openweathermap.org/img/wn/01n@2x.png'
    );
    expect(screen.getByText('Pressure 1021 hPa')).toBeInTheDocument();
    expect(screen.getByText('Humidity 60%')).toBeInTheDocument();
    expect(screen.getByText('Wind 4.61 mph')).toBeInTheDocument();
  });

  it('rounds temp to nearest integer', () => {
    setup();
    expect(screen.getByText('34°')).toBe('34°');
  });

  it('contains the add to favorites button', () => {
    expect(
      screen.getByRole('button', { name: 'Add to favorites' })
    ).toBeInTheDocument();
  });

  it('handles add to favorites', () => {
    setup();
    userEvent.click(screen.getByRole('button', { name: 'Add to favorites' }));
    expect(handleSubmitFavorite).toHaveBeenCalledTimes(1);
  });

  it('contains copyright', () => {
    setup();
    expect(screen.getByText('© Firstly NodeJS 2021')).toBeInTheDocument();
  });
});
