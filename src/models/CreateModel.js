import { Model } from '../Model';
import { fieldLabels } from '../constants';

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
  calculatorValue = '';

  toStep(step) {
    this.step = step;
  }

  updateExtra(index, path, value) {
    this.extra[index][path] = value;
  }

  addExtra(extra) {
    this.extra.push(extra);
  }

  incrementStep() {
    ++this.step;
  }

  decrementStep() {
    --this.step;
  }

  setValue(key, value) {
    this.values[key] = value;
  }

  setError(error) {
    this.error = error;
  }

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

  validateExtras() {
    return this.extra.map((value) => value.label.length > 0 && value.value.length > 0);
  }

  validateValues() {
    return Object.keys(this.values).map((key) => fieldLabels[key].type === 'number' ? !isNaN(parseInt(this.values[key], 10)) : this.values[key].length > 0);
  }
}
