import { Controller } from '../Controller';
import { categoryLabels } from '../constants';
import { ImageUpload } from '../utils/imageUpload';
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
      temperature: 0,
      locationAvailable: true,
      selectedProduct: {}
    };
  }

  onUpload() {
    const imageUpload = new ImageUpload(document.getElementById('product_image'), document.getElementById('product_canvas'));
    imageUpload.setListener();
    imageUpload.clearCanvas();
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
      selectedProduct: storage.getProduct(this.state.name, product.target.value)
    });
  };

  navigateTo = (target) => navigate(target);
}
