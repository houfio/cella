import { Model } from '../Model';

export class CategoryModel extends Model {
  city = this.cities[0];
  temperature = undefined;
  productId = undefined;
  grid = [];

  get cities() {
    return [
      'Huidige locatie',
      'Maastricht',
      'Weert',
      'Eindhoven',
      '\'s-Hertogenbosch',
      'Utrecht',
      'Amsterdam',
      'Uden'
    ];
  }

  setCity(city) {
    this.city = city;
  }

  setTemperature(temp) {
    this.temperature = temp;
  }

  setProductId(id) {
    this.productId = id;
  }
}
