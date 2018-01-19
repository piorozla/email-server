const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Blank');
});

app.post('/', (req, res) => {
  res.send('Test');
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
