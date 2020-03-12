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

  initial(params) {
    return {
      ...params,
      city: '',
      data: {}
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

    this.set({
      ...this.state,
      data: await weather.getByLocation()
    });
  }

  get name() {
    return this.state.name;
  }

  get products() {
    return storage.get(this.name, Product);
  }

  get weather() {
    return this.state.data;
  }

  getWeatherByCity = async () => {
    const city = document.getElementById('city').value;

    this.set({
      ...this.state,
      city,
      data: await weather.getByCity(city)
    });
  };

  navigateTo = (element) => navigate(element.dataset.target);
}
