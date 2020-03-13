import { Controller } from '../Controller';
import { categoryLabels } from '../constants';
import { navigate } from '../utils/navigate';
import { storage } from '../utils/storage';
import { weather } from '../utils/weather';
import { CategoryView } from '../views/CategoryView';

export class CategoryController extends Controller {
  static get route() {
    return /^\/(?<name>[\w]+)$/;
  }

  initial(params) {
    return {
      ...params,
      city: '',
      temperature: 0
    };
  }

  view() {
    return CategoryView;
  }

  async mount() {
    const { name } = this.state;

    if (!categoryLabels[name]) {
      navigate('/');
    }

    try {
      const { main } = await weather.getByLocation();

      this.set({
        ...this.state,
        temperature: main.temp
      });
    } catch (e) {
      console.error(e);
    }
  }

  get name() {
    return this.state.name;
  }

  get city() {
    return this.state.city;
  }

  get temperature() {
    return this.state.temperature;
  }

  get products() {
    return storage.get(this.name);
  }

  getWeatherByCity = async () => {
    const city = document.getElementById('city').value;

    try {
      const { name, main } = await weather.getByCity(city);

      this.set({
        ...this.state,
        city: name,
        temperature: main.temp
      });
    } catch (e) {
      console.error(e);
    }
  };

  navigateTo = (event) => navigate(event.target.dataset.target);
}
