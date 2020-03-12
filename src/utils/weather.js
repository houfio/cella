class Weather {
  #api = 'https://api.openweathermap.org/data/2.5/weather?appid=6a9c842a2a187ed5cbbb0ae055bce965&units=metric';

  // eslint-disable-next-line no-undef
  async #getLocation() {
    const { coords } = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return [coords.latitude, coords.longitude];
  }

  async getByLocation() {
    const [lat, lon] = await this.#getLocation();
    const url = `${this.#api}&lat=${lat}&lon=${lon}`;
    const response = await fetch(url);

    return await response.json();
  }

  async getByCity(city) {
    const url = `${this.#api}&q=${city}`;
    const response = await fetch(url);

    return await response.json();
  }
}

export const weather = new Weather();
