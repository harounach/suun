// axios http client
const axios = require("axios").default;
// 48.8566° N, 2.3522° E
const Paris = {
  lon: 2.3522,
  lat: 48.8566,
};

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
const OPEN_WEATHER_MAP = "https://api.openweathermap.org/data/2.5/onecall";

exports.fetchWeatherData = async function () {
  return axios(OPEN_WEATHER_MAP, {
    params: {
      lat: Paris.lat,
      lon: Paris.lon,
      exclude: "current,minutely,hourly,alerts",
      appid: process.env.API_KEY,
    },
  });
};
