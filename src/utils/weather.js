class Weather {
  #apiUrlCoordinates = 'https://api.openweathermap.org/data/2.5/weather?lat=%&lon=%&appid=6a9c842a2a187ed5cbbb0ae055bce965&units=metric';
  #apiUrlCity = 'https://api.openweathermap.org/data/2.5/weather?q=%&appid=6a9c842a2a187ed5cbbb0ae055bce965&units=metric';
  #longitude = 0;
  #latitude = 0;
  #data = {};

  #getWeather = () => {
    let apiUrl = this.#apiUrlCoordinates;

    apiUrl = apiUrl.replace('%', this.#latitude.toString());
    apiUrl = apiUrl.replace('%', this.#longitude.toString());

    return fetch(apiUrl).then((response) => {
      return response.json();
    });
  };

  #getWeatherByCity = city => {
    let apiUrl = this.#apiUrlCity;

    apiUrl = apiUrl.replace('%', city);

    return fetch(apiUrl).then((response) => {
      return response.json();
    });
  };

  #getCoordinates = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  #determineLocation = () => {
    return this.#getCoordinates().then((position) => {
      this.#latitude = position.coords.latitude;
      this.#longitude = position.coords.longitude;
    });
  };

  getCustomCity(city) {
    return this.#getWeatherByCity(city).then((data) => {
      return data;
    });
  }

  get() {
    return this.#determineLocation().then(() => {
      return this.#getWeather().then((data) => {
        return data;
      });
    });
  }

  get longitude() {
    return this.#longitude;
  }

  get latitude() {
    return this.#latitude;
  }
}

export const weather = new Weather();
