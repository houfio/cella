import { Controller } from '../Controller';
import { NotFoundView } from '../views/NotFoundView';

export class NotFoundController extends Controller {
  static get route() {
    return /^.*$/;
  }

  view() {
    return NotFoundView;
  }
}
