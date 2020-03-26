import { Model } from '../Model';

export class CategoryModel extends Model {
  city = this.cities[0];
  temperature = undefined;
  productId = undefined;

  get cities() {
    return [
      'Huidige locatie',
      'Maastricht',
      'Weert',
      'Eindhoven',
      '\'s-Hertogenbosch',
      'Utrecht',
      'Amsterdam'
    ];
  }
}
