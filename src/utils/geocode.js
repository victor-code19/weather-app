const request = require("request");

const geocode = (address) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?limit=2&access_token=pk.eyJ1IjoidmljdG9yMDE5IiwiYSI6ImNreXQyeW4wajBzanMyb3FhdDk2N24xcWMifQ.6K6o55OYUsTR57_Jd2BwPA&limit=1`;

  return new Promise((resolve, reject) => {
    request({ url, json: true }, (error, { body } = {}) => {
      if (error) {
        reject("Unable to connect to location service!");
      } else if (body.features[0] === undefined) {
        reject("Unable to find location. Try again!");
      } else {
        const data = body.features[0];
        resolve({
          longitude: data.center[0],
          latitude: data.center[1],
          location: data.place_name,
        });
      }
    });
  });
};

module.exports = geocode;
