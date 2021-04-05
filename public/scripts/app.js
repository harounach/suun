window.addEventListener("DOMContentLoaded", () => {
  // Model
  const model = {
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
        city: "London",
      });
    },
  };

  // Controller
  const controller = {
    init: function () {
      view.init();
      this.getData();
    },

    getData: function () {
      model
        .getWeatherData("London")
        .then((response) => {
          view.render(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    chooseImage: function (main) {
      return model.imagesMap[main];
    },

    formatDegrees: function (degree) {
      return Math.round(degree);
    },
  };

  // View
  const view = {
    init: function () {
      this.cityName = document.querySelector(".city__name");
      this.cityError = document.querySelector(".city__error");
      this.todayDegrees = document.querySelector(".today__degrees");
      this.todayImage = document.querySelector(".today__img");
      this.days = document.querySelectorAll(".day");
    },

    render: function (weatherData) {
      console.log(weatherData);

      const current = weatherData["current"];
      this.populateToday(current);

      // populate days
      // this.days.forEach((day) => {
      //   day.getElementsByClassName("day__name")[0].textContent = 55;
      // });
    },
    showError: function () {},
    populateToday: function (current) {
      const main = current["weather"][0]["main"];
      const imageUrl = controller.chooseImage(main);
      this.todayImage.src = imageUrl;

      const formattedDegree = controller.formatDegrees(current["temp"]);
      this.todayDegrees.textContent = `${formattedDegree}°`;
    },
  };

  // init App
  controller.init();
});
