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
      city: '',
      temperature: 0,
      locationAvailable: true,
      selectedProduct: {}
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
        temperature: main.temp,
        locationAvailable: true
      });
    } catch (e) {
      this.set({
        ...this.state,
        locationAvailable: false
      });
    }
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

  get locationAvailable() {
    return this.state.temperature;
  }

  get products() {
    return storage.get(this.name);
  }

  get selectedProduct() {
    return this.state.selectedProduct;
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

  selectProduct = (product) => {
    this.set({
      ...this.state,
      selectedProduct: storage.getById(this.state.name, product.target.value)
    });
  };

  navigateTo = (target) => navigate(target);

  onUpload = (e) => {
    this.#upload.clearCanvas();
    this.#upload.onUpload(e);
  };

  mouseMove = (e) => this.#drawer?.draw(e);
  mouseDown = (e) => this.#drawer?.setPosition(e);
  mouseUp = (e) => this.#drawer?.setPosition(e);
}
