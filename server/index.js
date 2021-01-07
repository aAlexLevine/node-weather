const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mainRoutes = require('./mainRoutes.js');

const app = express();

app.use(express.static(path.join(__dirname, '/../react-client/dist')));
app.use(bodyParser.json());

app.use('/api/main', mainRoutes);

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}*!`);
});
