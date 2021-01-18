const favorites = [
  {
    id: 8,
    name: 'New York',
    zip: '10001',
  },
  {
    id: 23,
    name: 'Miami',
    zip: '33101',
  },
];

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

const axios = jest
  .fn()
  .mockImplementation(() => Promise.resolve({ data: favorites }));

axios.get = jest
  .fn()
  .mockImplementation(() => Promise.resolve({ data: weatherData }));

export default axios;
