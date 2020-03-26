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
}
