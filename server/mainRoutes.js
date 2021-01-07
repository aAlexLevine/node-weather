const express = require('express');

const router = express.Router();

router.get('/test', (req, res) => {
  console.log('test on mainAPI')
  res.send({ value: 'test on mainAPI' });
});

module.exports = router;
