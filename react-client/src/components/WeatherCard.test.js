import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WeatherCard from './WeatherCard';

const setup = (favorites = []) => {
  const handler = jest.fn(); //.mockImplementation((e) => e.preventDefault());
  const utils = render(
    <WeatherCard
      weatherData={weatherData}
      favorites={favorites}
      addToFavorites={handler}
    />
  );
  return {
    handler,
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
  zip: '10001',
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

  it('rounds temp to nearest integer and has degrees', () => {
    setup();
    expect(screen.getByText('34°')).toBeInTheDocument('34°');
  });

  it('contains the add to favorites button when zip is not in favorites', () => {
    const favorites = [
      { name: 'Miami', zip: '33101' },
      { name: 'Albany', zip: '12222' },
    ];
    setup(favorites);
    expect(
      screen.getByRole('button', { name: 'Add to favorites' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add to favorites' })
    ).not.toHaveAttribute('disabled')
  });

  it('does not contain the add to favorites button when zip is in favorites', () => {
    const favorites = [
      { name: 'Miami', zip: '33101' },
      { name: 'New York', zip: '10001' },
    ];
    setup(favorites);
    expect(
      screen.queryByRole('button', { name: 'Add to favorites' })
    ).toBeNull();
    expect(
      screen.getByRole('button', { name: 'Saved' })
    ).toHaveAttribute('disabled');
  });

  it('handles add to favorites', () => {
    const { handler } = setup();
    userEvent.click(screen.getByRole('button', { name: 'Add to favorites' }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('contains copyright', () => {
    setup();
    expect(screen.getByText('© Firstly NodeJS 2021')).toBeInTheDocument();
  });
});
