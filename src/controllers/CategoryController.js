import { Controller } from '../Controller';
import { categoryLabels } from '../constants';
import { CategoryModel } from '../models/CategoryModel';
import { Drawer } from '../utils/drawer';
import { navigate } from '../utils/navigate';
import { storage } from '../utils/storage';
import { Upload } from '../utils/upload';
import { weather } from '../utils/weather';
import { CategoryView } from '../views/CategoryView';

export class CategoryController extends Controller {
  static get route() {
    return /^\/(?<name>[\w]+)$/;
  }

  #upload;
  #drawer;

  view() {
    return CategoryView;
  }

  initial() {
    return CategoryModel;
  }

  async mount() {
    const { name } = this.model;

    if (!categoryLabels[name]) {
      navigate('/');
    }

    this.getWeather();
  }

  update() {
    const ref = this.refs['product_canvas'];

    this.#upload = ref ? new Upload(ref) : undefined;
    this.#drawer = ref ? new Drawer(ref) : undefined;
  }

  get name() {
    return this.model.name;
  }

  get city() {
    return this.model.city;
  }

  get temperature() {
    return this.model.temperature;
  }

  get products() {
    return storage.get(this.name);
  }

  get product() {
    return storage.getById(this.model.name, this.model.productId);
  }

  get cities() {
    return this.model.cities;
  }

  getWeather = async () => {
    const city = this.refs['city'].value;
    const current = city === this.cities[0];

    this.set((model) => {
      model.city = city;
      model.temperature = undefined;
    });

    if (!current) {
      const { main } = await weather.getByCity(city);

      return this.set((model) => {
        model.temperature = main.temp;
      });
    }

    try {
      const { main } = await weather.getByLocation();

      this.set((model) => {
        model.temperature = main.temp;
      });
    } catch {
      this.set((model) => {
        model.temperature = null;
      });
    }
  };

  selectProduct = (product) => this.set((model) => {
    model.productId = product.target.value;
  });

  navigateTo = (target) => navigate(target);

  onUpload = (e) => {
    this.#upload.clearCanvas();
    this.#upload.onUpload(e);
  };

  handleDraw = (e) => this.#drawer?.draw(e);
}
