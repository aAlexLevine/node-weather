# node-weather

Node JS application that retrieves weather data from the [openweathermap API](https://openweathermap.org/current) and lets its user save a list of favorite locations for quicker weather retrieval.

## Getting Started

#### Docker

Ensure you have Docker running and [Docker Compose](https://docs.docker.com/compose/) installed.

* Clone the repository. 
* In the terminal at the root of the project run the compose command 
`docker-compose up -d`
* When the stages outlined below are complete navigate to `http://localhost:3000` in your browser.

Note: This may take a few minutes, a few things are happening.
1. Docker is building a container for the Node App and for the MySQL databse.
2. Docker is installing node modules (this accounts for the bulk of time but should not be an issue on subsequent builds)
3. Webpack is creating a bundle.js and an HTML file as an entry point for the react-client. These are located in the `react-client/dist` folder.
4. Once the MySQL database is ready Node will start the express server.

This set up is not configured for optimal development and any changes made to the code will require a a re-build of the bundle.js. 

You can rebuild locally with `npm run build` or to rebuild the bundle with the docker containers running by running the following in the terminal
* `docker ps` - gets a list of running containers and their ID's
* `docker exec -it <CONTAINER_ID> /bin/sh`
* `npm run build`

You can close the containers by running  `docker-compose down`

## API Documentation
See the directory API-docs

The Express Server exposes these endpoints
* [addToFavorites](API-docs/addToFavorites.md)
* [getAllFavoriteZips](API-docs/getAllFavoriteZips.md)
* [getWeatherByZip](API-docs/getWeatherByZip.md)
* [removeFromFavorites](API-docs/removeFromFavorites.md)

## Testing

Unit testing is managed by Jest and React Testing Library

Testing for this application is motivated not by implementation details but how a user actually engages with the DOM.

See [this article](https://kentcdodds.com/blog/introducing-the-react-testing-library) by Kent C. Dodds for a good primer on the library and the thought process behind it.


* `npm run test`

## Built With

* Node
* React
* Express
* MySQL

## Roadmap

#### Future Feature Proposals

* Favorites List will filter itself as the user types to display only matching entries, e.g. typing "112" will display only [11222, 11233, 11244] instead of the entire list.

* Favorites List with sort itself based upon how often its clicked. 

    