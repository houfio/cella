import { Controller } from '../Controller';
import { categoryLabels } from '../constants';
import { navigate } from '../utils/navigate';
import { HomeView } from '../views/HomeView';

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

  navigateTo = (target) => navigate(`/${target}`);
}
