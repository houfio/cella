import { Model } from '../Model';

export class CreateModel extends Model {
  step = 0;
  values = {
    name: '',
    description: '',
    purchasePrice: '',
    price: '',
    stock: '',
    minimumStock: ''
  };
  extra = [];

  fillData(product) {
    for (const [key, value] of Object.entries(product).filter(([key]) => key !== 'id')) {
      if (key === 'extra') {
        this.extra = product[key];
      } else if (key === 'image') {
        this.image = product[key];
      } else {
        this.values[key] = value;
      }
    }
  }
}
