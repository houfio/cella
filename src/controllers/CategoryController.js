import fileInput from 'bs-custom-file-input';
import { Controller } from '../Controller';
import { blockages, categoryLabels } from '../constants';
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
    const canvasRef = this.refs['product_canvas'];

    this.#upload = canvasRef ? new Upload(canvasRef) : undefined;
    this.#drawer = canvasRef ? new Drawer(canvasRef) : undefined;

    if (this.product && this.product.image) {
      this.#drawer.fillCanvas(this.product.image);
    }

    fileInput.init();
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
    return storage.getById(this.name, this.model.productId);
  }

  get cities() {
    return this.model.cities;
  }

  get grid() {
    return storage.get(`${this.name}_grid`);
  }

  getWeather = async () => {
    const city = this.refs['city'].value;
    const current = city === this.cities[0];

    this.set((model) => {
      model.setCity(city);
      model.setTemperature(undefined);
    });

    if (!current) {
      const { main } = await weather.getByCity(city);

      return this.set((model) => {
        model.setTemperature(main.temp);
      });
    }

    try {
      const { main } = await weather.getByLocation();

      this.set((model) => {
        model.setTemperature(main.temp);
      });
    } catch {
      this.set((model) => {
        model.setTemperature(null);
      });
    }
  };

  selectProduct = (product) => this.set((model) => {
    model.setProductId(product.target.value);
  });

  navigateTo = (target) => navigate(target);

  onUpload = (e) => {
    this.#upload.clearCanvas();
    this.#upload.onUpload(e);
  };

  handleDraw = (e) => this.#drawer?.draw(e);

  drag = (e) => {
    const { productId } = this.model;

    e.dataTransfer.setData('product', productId);
  };

  drop = (e, index) => {
    const product = e.dataTransfer.getData('product');

    if (!product || this.isBlocked(index) || this.hasProduct(index)) {
      return;
    }

    storage.push(`${this.name}_grid`, {
      id: index,
      productId: product
    });

    e.preventDefault();
    this.rerender();
  };

  saveCanvas = () => {
    storage.update(this.name, this.model.productId, {
      ...this.product,
      image: this.#drawer.base64
    });

    this.rerender();
  };

  removeProduct = (e, index) => {
    storage.remove(`${this.name}_grid`, index);

    this.rerender();
  };

  isBlocked = (index) => blockages[this.name].indexOf(index) !== -1;

  hasProduct = (index) => this.grid.some(({ id }) => id === index);

  getProductImage = (index) => {
    for (const { id, productId } of this.grid) {
      if (id === index) {
        return storage.getById(this.name, productId).image || '';
      }
    }

    return '';
  };
}
