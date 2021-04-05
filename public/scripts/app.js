window.addEventListener("DOMContentLoaded", () => {
  // Model
  const model = {
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
  };

  // View
  const view = {
    init: function () {
      this.cityName = document.querySelector(".city__name");
      this.cityError = document.querySelector(".city__error");
      this.todayDegrees = document.querySelector(".today__degrees");

      console.log(this.cityName);
    },

    render: function (weatherData) {
      console.log(weatherData);
    },
    showError: function () {},
  };

  // init App
  controller.init();
});
