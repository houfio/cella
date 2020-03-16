import { generate } from 'shortid';
import { Controller } from '../Controller';
import { extraFields } from '../constants';
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

  initial(params) {
    return {
      ...params,
      step: 0,
      values: {
        name: '',
        description: '',
        purchasePrice: '',
        price: '',
        stock: '',
        minimumStock: ''
      },
      extra: []
    };
  }

  mount() {
    const extra = extraFields[this.state.name];

    if (!extra) {
      navigate('/');

      return;
    }

    this.set({
      ...this.state,
      values: {
        ...this.state.values,
        ...extra.reduce((previous, current) => ({
          ...previous,
          [current]: ''
        }), {})
      }
    });
  }

  get step() {
    return this.state.step;
  }

  get values() {
    return Object.entries(this.state.values);
  }

  get extra() {
    return this.state.extra;
  }

  get extraCount() {
    return this.state.extra.length;
  }

  get addingExtra() {
    return this.step >= this.values.length;
  }

  saveValue = () => {
    const { step, values } = this.state;
    const keys = Object.keys(values);

    if (step >= keys.length) {
      return;
    }

    const id = keys[step];

    this.set({
      ...this.state,
      values: {
        ...values,
        [id]: document.getElementById(id).value
      }
    }, false);
  };

  previousStep = () => {
    const { name, step } = this.state;

    if (!step) {
      navigate(`/${name}`);

      return;
    }

    this.saveValue();
    this.set({
      ...this.state,
      step: step - 1
    });
  };

  nextStep = () => {
    const { step } = this.state;

    this.saveValue();
    this.set({
      ...this.state,
      step: step + 1
    });
  };

  toStep = (step) => {
    this.saveValue();
    this.set({
      ...this.state,
      step
    });
  };

  saveExtraInput = (event, index, path) => {
    const { extra } = this.state;

    this.set({
      ...this.state,
      extra: extra.map((input, i) => {
        if (String(i) !== index) {
          return input;
        }

        return {
          ...input,
          [path]: event.target.value
        };
      })
    }, false);
  };

  addInputField = () => this.set({
    ...this.state,
    extra: [
      ...this.state.extra,
      {
        label: '',
        value: ''
      }
    ]
  });

  removeInputField = () => this.set({
    ...this.state,
    extra: this.state.extra.slice(0, -1)
  });

  saveProduct = () => {
    const { name, values, extra } = this.state;

    storage.push(name, { id: generate(), ...values, extra });
    navigate(`/${name}`);
  };
}
