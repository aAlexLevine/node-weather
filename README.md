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

To rebuild the bundle with the docker containers running, run the following in the terminal
* `docker ps` - gets a list of running containers and their ID's
* `docker exec -it <CONTAINER_ID> /bin/sh`
* `npm run build`

You can close the containers by running  `docker-compose down`

## Roadmap

#### Future Feature Proposals

* Favorites List will filter itself as the user types to displaying only matching entries, e.g. typing "112" will display only [11222, 11233, 11244] instead of the entire list.

* Favorites List with sort itself based upon how often its clicked. 

    