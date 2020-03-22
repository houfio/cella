import { Controller } from '../Controller';
import { categoryLabels } from '../constants';
import { Drawer } from '../utils/drawer';
import { navigate } from '../utils/navigate';
import { storage } from '../utils/storage';
import { Upload } from '../utils/upload';
import { weather } from '../utils/weather';
import { CategoryView } from '../views/CategoryView';

export class CategoryController extends Controller {
  #upload;
  #drawer;

  static get route() {
    return /^\/(?<name>[\w]+)$/;
  }

  initial(params) {
    return {
      ...params,
      city: this.cities[0],
      temperature: undefined,
      productId: undefined
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

    this.getWeather();
  }

  update() {
    this.#upload = new Upload(this.refs['product_canvas']);
    this.#drawer = new Drawer(this.refs['product_canvas']);
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

  get product() {
    return storage.getById(this.state.name, this.state.productId);
  }

  get cities() {
    return [
      'Huidige locatie',
      'Maastricht',
      'Weert',
      'Eindhoven',
      '\'s-Hertogenbosch',
      'Utrecht',
      'Amsterdam'
    ];
  }

  getWeather = async () => {
    const city = this.refs['city'].value;
    const current = city === this.cities[0];

    this.set({
      ...this.state,
      city,
      temperature: undefined
    });

    if (!current) {
      const { main } = await weather.getByCity(city);

      return this.set({
        ...this.state,
        temperature: main.temp
      });
    }

    try {
      const { main } = await weather.getByLocation();

      this.set({
        ...this.state,
        temperature: main.temp
      });
    } catch {
      this.set({
        ...this.state,
        temperature: null
      });
    }
  };

  selectProduct = (product) => {
    this.set({
      ...this.state,
      productId: product.target.value
    });
  };

  navigateTo = (target) => navigate(target);

  onUpload = (e) => {
    this.#upload.clearCanvas();
    this.#upload.onUpload(e);
  };

  handleDraw = (e) => this.#drawer?.draw(e);
}
