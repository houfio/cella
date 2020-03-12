class Weather {
  #apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=%&lon=%&appid=%&units=metric';
  #longitude = 0;
  #latitude = 0;
  #data = {};

  #getWeather = () => {
    let apiUrl = this.#apiUrl;

    apiUrl = apiUrl.replace('%', this.#latitude.toString());
    apiUrl = apiUrl.replace('%', this.#longitude.toString());
    apiUrl = apiUrl.replace('%', '6a9c842a2a187ed5cbbb0ae055bce965');

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
