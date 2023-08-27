const request = require('request');

const forecast = (latitude, longitude) => {
  const url = `http://api.weatherstack.com/current?access_key=5435335bcbfb54b295d3748826d8f7c4&query=${latitude},${longitude}`;

  return new Promise((resolve, reject) => {
    request({ url, json: true }, (error, { body }) => {
      if (error) {
        reject('Unable to connect to weather service!');
      } else if (body.error) {
        reject('Unable to find location, try again!');
      } else {
        const data = body.current;
        const { weather_descriptions, temperature, feelslike } = data;
        resolve(
          `It is currently ${weather_descriptions}. There is ${temperature} degrees out and it feels like ${feelslike}.`
        );
      }
    });
  });
};

module.exports = forecast;
