import { HomeView } from '../views/HomeView';
import { categoryLabels } from '../constants';
import { navigate } from '../utils/navigate';
import { Controller } from '../Controller';

export class HomeController extends Controller {
  static get route() {
    return /^\/$/;
  }

  view() {
    return HomeView;
  }

  get categories() {
    return Object.entries(categoryLabels);
  }

  navigateTo = (element) => navigate(`/${element.dataset.target}`);
}
