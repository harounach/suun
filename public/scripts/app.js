window.addEventListener("DOMContentLoaded", () => {
  /* Weather types */

  /**
   * Weather Item
   *  @typedef {Object} WeatherItem
   *
   * @property {number} dt - Date time
   * @property {Temperature} temp - Temperature
   * @property {Array<WeatherCondition>} weather - Weather conditions
   *
   */

  /**
   * Current Weather Item
   *  @typedef {Object} CurrentWeatherItem
   *
   * @property {number} dt - Date time
   * @property {number} temp - Temperature
   * @property {Array<WeatherCondition>} weather - Weather conditions
   *
   */

  /**
   * Weather Condition
   * @typedef {Object} WeatherCondition
   *
   * @property {number} id - Weather condition id
   * @property {string} main - Weather condition name
   * @property {string} description - Weather condition description
   */

  /**
   * Weather Temperature
   * @typedef {Object} Temperature
   *
   * @property {number} day
   * @property {number} eve
   * @property {number} max
   * @property {number} min
   * @property {number} morn
   * @property {number} night
   */

  // Model
  const model = {
    defaultCity: "London",
    searchCity: "London",
    imagesMap: {
      Thunderstorm: "./images/Thunderstorm.svg",
      Drizzle: "./images/Shower.svg",
      Rain: "./images/Rain.svg",
      Snow: "./images/Snow.svg",
      Clear: "./images/Sunny.svg",
      Clouds: "./images/Cloudy.svg",
      // Atmosphere
      Mist: "./images/Cloudy.svg",
      Smoke: "./images/Cloudy.svg",
      Haze: "./images/Cloudy.svg",
      Dust: "./images/Cloudy.svg",
      Fog: "./images/Cloudy.svg",
      Sand: "./images/Cloudy.svg",
      Dust: "./images/Cloudy.svg",
      Ash: "./images/Cloudy.svg",
      Squall: "./images/Cloudy.svg",
      Tornado: "./images/Cloudy.svg",
    },
    getWeatherData: async function (city) {
      return axios.post("/weather", {
        city: city,
      });
    },
  };

  // Controller
  const controller = {
    init: function () {
      view.init();
      this.getData(model.defaultCity);
    },

    getData: function (city) {
      // show loader
      view.showLoader(true);

      model
        .getWeatherData(city)
        .then((response) => {
          // hide loader
          view.showLoader(false);
          view.hideError();
          view.render(response.data);
        })
        .catch((err) => {
          // hide loader
          view.showLoader(false);
          view.showError();
          console.log(err);
        });
    },

    chooseImage: function (main) {
      return model.imagesMap[main];
    },

    formatTemperature: function (temp) {
      return Math.round(temp);
    },
  };

  // View
  const view = {
    init: function () {
      this.searchForm = document.querySelector(".search-form");
      this.searchInput = document.querySelector(".search-form__input-control");
      this.cityName = document.querySelector(".city__name");
      this.cityError = document.querySelector(".city__error");
      this.todayDegrees = document.querySelector(".today__degrees");
      this.todayImage = document.querySelector(".today__img");
      this.days = document.querySelectorAll(".day");
      this.loader = document.querySelector(".loader");

      const self = this;

      // Register search form listener
      this.searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const searchInputValue = self.searchInput.value;
        if (searchInputValue) {
          controller.getData(searchInputValue);
        }
      });
    },

    render: function (weatherData) {
      // console.log(weatherData);

      const current = weatherData["current"];
      const daily = weatherData["daily"];
      this.populateToday(current);
      this.populateAllDays(daily);
    },
    showError: function () {
      console.log("Something Went wrong!!!");
      this.cityError.classList.add("city__error--show-error");
    },
    hideError: function () {
      this.cityError.classList.remove("city__error--show-error");
    },
    /**
     * @param {CurrentWeatherItem} current
     */
    populateToday: function (current) {
      const main = current.weather[0].main;
      const imageUrl = controller.chooseImage(main);
      this.todayImage.src = imageUrl;

      const formattedTemperature = controller.formatTemperature(current.temp);
      this.todayDegrees.textContent = `${formattedTemperature}°`;
    },

    /**
     * @param {WeatherItem} currentDay
     * @param {HTMLDivElement} day
     */
    populateDay: function (currentDay, day) {
      // Get temperature
      const temperature = controller.formatTemperature(currentDay.temp.day);
      // Get image
      const main = currentDay.weather[0].main;
      const imagesUrl = controller.chooseImage(main);

      // Set temperature
      day.querySelector(".day__degrees").textContent = `${temperature}°`;
      // Set image
      day.querySelector(".day__img").src = imagesUrl;
    },

    /**
     * @param {Array<WeatherItem>} daily
     */
    populateAllDays: function (daily) {
      // populate days
      this.days.forEach((day, index) => {
        this.populateDay(daily[index], day);
      });
    },

    /** */
    showLoader: function (isLoading) {
      if (isLoading) {
        this.loader.classList.add("loader--show");
      } else {
        this.loader.classList.remove("loader--show");
      }
    },
  };

  // init App
  controller.init();
});
