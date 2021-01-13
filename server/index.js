const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mysql');
const path = require('path');
const mainRoutes = require('./mainRoutes.js');

const app = express();

app.use(express.static(path.join(__dirname, '/../react-client/dist')));
app.use(bodyParser.json());

app.use('/api/main', mainRoutes);

const port = process.env.PORT || 3000;

db.init()
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on port ${port}*!`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const gracefulShutdown = () => {
  db.teardown()
  .then(() => process.exit())
  .catch((err) => console.log(err))
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
