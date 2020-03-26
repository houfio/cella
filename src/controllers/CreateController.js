import { generate } from 'shortid';
import { Controller } from '../Controller';
import { extraFields } from '../constants';
import { CreateModel } from '../models/CreateModel';
import { navigate } from '../utils/navigate';
import { storage } from '../utils/storage';
import { CreateView } from '../views/CreateView';

export class CreateController extends Controller {
  static get route() {
    return /^\/(?<name>[\w]+)\/create$/;
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

    this.set((model) => {
      for (const e of extra) {
        model.values[e] = '';
      }
    });
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

  get addingExtra() {
    return this.step >= this.values.length;
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
      model.values[id] = value;
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

    storage.push(name, { id: generate(), ...values, extra });
    navigate(`/${name}`);
  };
}
