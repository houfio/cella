import { Controller } from '../Controller';
import { NotFoundModel } from '../models/NotFoundModel';
import { NotFoundView } from '../views/NotFoundView';

export class NotFoundController extends Controller {
  static get route() {
    return /^.*$/;
  }

  view() {
    return NotFoundView;
  }

  initial() {
    return NotFoundModel;
  }
}
