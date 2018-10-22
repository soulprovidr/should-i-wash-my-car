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

app.use(cors({
  origin: (origin, callback) => {
    if (origin.indexOf('localhost') > -1 || origin === Domain) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS.'));
  }
}));

app.get('/weather/:latitude/:longitude', (req, res) => {
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

app.listen(process.env.SERVER_PORT || 3000);