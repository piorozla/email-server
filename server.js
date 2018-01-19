const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('Blank');
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
