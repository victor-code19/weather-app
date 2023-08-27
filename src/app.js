const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

const app = express();

// define paths for Express config
const publicFileDirectory = path.join(__dirname, '/../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine, views and partials location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicFileDirectory));

// routes
app.get('', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    phone_number: '721 421 934',
  });
});

app.get('/weather', async (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term!',
    });
  }

  const address = req.query.search;

  try {
    const { longitude, latitude, location } = await geocode(address);
    const forecastData = await forecast(latitude, longitude);

    res.send({
      coords: { longitude, latitude },
      location,
      forecast: forecastData,
    });
  } catch (error) {
    res.send({ error });
  }
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    message: 'Help article not found :(',
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    message: '404 - page not found :(',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
