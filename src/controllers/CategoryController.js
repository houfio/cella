import { categoryLabels } from '../constants';
import { navigate } from '../utils/navigate';
import { CategoryView } from '../views/CategoryView';
import { storage } from '../utils/storage';
import { Product } from '../models/Product';
import { Controller } from '../Controller';

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
  }

  get name() {
    return this.state.name;
  }

  get products() {
    return storage.get(this.name, Product);
  }

  navigateTo = (element) => navigate(element.dataset.target);
}
