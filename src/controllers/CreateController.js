import { generate } from 'shortid';
import { Controller } from '../Controller';
import { extraFields } from '../constants';
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
      this.set((model) => {
        model.fillData(storage.getById(this.model.name, this.model.id));
      });
    } else {
      this.set((model) => {
        for (const e of extra) {
          model.setValue(e, '');
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

  get calculatorValue() {
    return this.model.calculatorValue;
  }

  saveValue = () => {
    const { step, values } = this.model;
    const keys = Object.keys(values);

    if (step >= keys.length) {
      return;
    }

    const id = keys[step];
    const value = document.getElementById(id).value;

    this.set((model) => {
      model.setValue(id, value);
      model.setError(false);
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
      model.decrementStep();
    });
  };

  nextStep = () => {
    this.saveValue();
    this.set((model) => {
      model.incrementStep();
    });
  };

  toStep = (step) => {
    this.saveValue();
    this.set((model) => {
      model.toStep(step);
    });
  };

  saveExtraInput = (event, index, path) => {
    this.set((model) => {
      model.updateExtra(index, path, event.target.value);
    }, false);
  };

  addInputField = () => this.set((model) => {
    model.addExtra({
      label: '',
      value: ''
    });
  });

  removeInputField = () => this.set((model) => {
    model.extra.pop();
  });

  saveProduct = () => {
    const { name, values, extra } = this.model;

    const validated = this.model.validateValues().concat(this.model.validateExtras());

    if (validated.includes(false)) {
      this.set((model) => {
        model.setError(true);
      });

      return;
    }

    this.set((model) => {
      model.setError(false);
    });

    if (this.model.id) {
      storage.update(name, this.model.id, { id: this.model.id, ...values, extra, image: this.model.image });
    } else {
      storage.push(name, { id: generate(), ...values, extra });
    }

    navigate(`/${name}`);
  };

  setCalculatorValue = (value) => {
    this.set((model) => {
      model.calculatorValue = value;
    });
  };
}
