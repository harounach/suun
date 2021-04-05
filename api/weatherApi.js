// axios http client
const axios = require("axios").default;
// 48.8566° N, 2.3522° E
const Paris = {
  lon: 2.3522,
  lat: 48.8566,
};

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
const GEOCODE_API = "http://api.openweathermap.org/geo/1.0/direct";

exports.getCityCoordniates = async function (city) {
  return axios(GEOCODE_API, {
    params: {
      q: city,
      limit: 1,
      appid: process.env.API_KEY,
    },
  });
};

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
const OPEN_WEATHER_MAP = "https://api.openweathermap.org/data/2.5/onecall";

exports.fetchWeatherData = async function (city) {
  const response = await axios(OPEN_WEATHER_MAP, {
    params: {
      lat: Paris.lat,
      lon: Paris.lon,
      exclude: "current,minutely,hourly,alerts",
      appid: process.env.API_KEY,
    },
  });

  return response.data;
};
