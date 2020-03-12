import { Controller } from '../Controller';
import { categoryLabels } from '../constants';
import { Product } from '../models/Product';
import { navigate } from '../utils/navigate';
import { storage } from '../utils/storage';
import { weather } from '../utils/weather';
import { CategoryView } from '../views/CategoryView';

export class CategoryController extends Controller {
  static get route() {
    return /^\/(?<name>[\w]+)$/;
  }

  view() {
    return CategoryView;
  }

  mount() {
    const { name } = this.state;

    if (!categoryLabels[name]) {
      navigate('/');
    }

    weather.get().then((data) => {
      this.set({
        ...this.state,
        weatherData: data
      });
    });
  }

  getWeatherByCity = () => {
    this.set({
      ...this.state,
      city: document.getElementById('city').value
    });

    const { city } = this.state;

    weather.getCustomCity(city).then((data) => {
      this.set({
        ...this.state,
        weatherData: data
      });
    });
  };

  get name() {
    return this.state.name;
  }

  get products() {
    return storage.get(this.name, Product);
  }

  get weather() {
    return this.state.weatherData;
  }

  navigateTo = (element) => navigate(element.dataset.target);
}
