require('dotenv').config();

const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

const ApiKey = process.env.API_KEY;
const Domain = process.env.DOMAIN;
const ServerPort = process.env.SERVER_PORT || 3000;

if (!ApiKey) {
  console.error('No API key provided!');
  return false;
}

const Endpoint = `https://api.darksky.net/forecast/${ApiKey}/`;

const corsOptions = {
  origin: ['https://shouldiwash.info', 'https://www.shouldiwash.info'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.get('/:latitude/:longitude', (req, res) => {
  const { latitude, longitude } = req.params;
  axios.get(
    `${Endpoint}${latitude},${longitude}`,
    { params: { exclude: 'currently,minutely,hourly,alerts,flags' }}
  )
    .then(({ data }) => res.send(data))
    .catch((e) => res.status(500).json(e));
});

app.get('*', (req, res) => {
  res.status(404).send();
});

app.listen(ServerPort);