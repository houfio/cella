import { generate } from 'shortid';
import { Controller } from '../Controller';
import { extraFields, fieldLabels } from '../constants';
import { CreateModel } from '../models/CreateModel';
import { navigate } from '../utils/navigate';
import { storage } from '../utils/storage';
import { CreateView } from '../views/CreateView';

export class CreateController extends Controller {
  static get route() {
    return /^\/(?<name>[\w]+)\/(?:create|(?<id>[\w-]+))$/;
  }

  view() {
    return CreateView;
  }

  initial() {
    return CreateModel;
  }

  mount() {
    const extra = extraFields[this.model.name];

    if (!extra) {
      navigate('/');

      return;
    }

    if (this.model.id && storage.getById(this.model.name, this.model.id)) {
      const product = storage.getById(this.model.name, this.model.id);


      this.set((model) => {
        for (const [key, value] of Object.entries(product).filter(([key]) => key !== 'id' && key !== 'image')) {
          if (key === 'extra') {
            model.extra = product[key];
          } else {
            model.values[key] = value;
          }
        }
      });
    } else {
      this.set((model) => {
        for (const e of extra) {
          model.values[e] = '';
        }
      });
    }
  }

  get step() {
    return this.model.step;
  }

  get values() {
    return Object.entries(this.model.values);
  }

  get extra() {
    return this.model.extra;
  }

  get extraCount() {
    return this.model.extra.length;
  }

  get error() {
    return this.model.error;
  }

  get addingExtra() {
    return this.step >= this.values.length;
  }

  doCalculation = () => {

  };

  saveValue = () => {
    const { step, values } = this.model;
    const keys = Object.keys(values);

    if (step >= keys.length) {
      return;
    }

    const id = keys[step];
    const value = document.getElementById(id).value;

    this.set((model) => {
      model.values[id] = value;
      model.error = false;
    }, false);
  };

  previousStep = () => {
    const { name, step } = this.model;

    if (!step) {
      navigate(`/${name}`);

      return;
    }

    this.saveValue();
    this.set((model) => {
      model.step--;
    });
  };

  nextStep = () => {
    this.saveValue();
    this.set((model) => {
      model.step++;
    });
  };

  toStep = (step) => {
    this.saveValue();
    this.set((model) => {
      model.step = step;
    });
  };

  saveExtraInput = (event, index, path) => {
    this.set((model) => {
      model.extra[index][path] = event.target.value;
    }, false);
  };

  addInputField = () => this.set((model) => {
    model.extra.push({
      label: '',
      value: ''
    });
  });

  removeInputField = () => this.set((model) => {
    model.extra.pop();
  });

  saveProduct = () => {
    const { name, values, extra } = this.model;

    const validatedExtra = extra.map((value) => value.label.length > 0 && value.value.length > 0);
    const validatedValues = Object.keys(values).map((key) => fieldLabels[key].type === 'number' ? !isNaN(parseInt(values[key], 10)) : values[key].length > 0);
    const validated = validatedExtra.concat(validatedValues);

    if (validated.includes(false)) {
      this.set((model) => {
        model.error = true;
      });

      return;
    }

    this.set((model) => {
      model.error = false;
    });

    storage.push(name, { id: generate(), ...values, extra });
    navigate(`/${name}`);
  };
}
