import { Controller } from '../Controller';
import { categoryLabels } from '../constants';
import { HomeModel } from '../models/HomeModel';
import { navigate } from '../utils/navigate';
import { HomeView } from '../views/HomeView';

export class HomeController extends Controller {
  static get route() {
    return /^\/$/;
  }

  view() {
    return HomeView;
  }

  initial() {
    return HomeModel;
  }

  get categories() {
    return Object.entries(categoryLabels);
  }

  navigateTo = (target) => navigate(`/${target}`);
}
