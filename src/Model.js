import { immerable } from 'immer';

export class Model {
  [immerable] = true;

  constructor(params) {
    Object.assign(this, params);
  }
}
