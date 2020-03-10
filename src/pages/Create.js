import plus from '@fortawesome/fontawesome-free/svgs/solid/plus.svg';
import minus from '@fortawesome/fontawesome-free/svgs/solid/minus.svg';
import left from '@fortawesome/fontawesome-free/svgs/solid/chevron-left.svg';
import right from '@fortawesome/fontawesome-free/svgs/solid/chevron-right.svg';
import file from '@fortawesome/fontawesome-free/svgs/solid/file.svg';

import { Page } from '../Page';
import { html } from '../utils/html';
import { extraFields, fieldLabels } from '../constants';
import { navigate } from '../utils/navigate';

import './Create.scss';

export class Create extends Page {
  constructor(state, rerender) {
    super({
      ...state,
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
    }, rerender);
  };

  render() {
    const { step, values, extra } = this.state;
    const inputs = Object.keys(values);
    let form;

    if (step < inputs.length) {
      const id = inputs[step];
      const value = values[id];

      form = html`
        <div class="form-group">
          <label for="${id}">${fieldLabels[id]}</label>
          <input type="text" class="form-control" id="${id}" value="${value}"/>
        </div>
        <div class="actions">
          <button onclick="previousStep" class="btn btn-primary">
            ${left} ${step ? 'Vorige' : 'Annuleren'}
          </button>
          <button onclick="nextStep" class="btn btn-primary">
            ${right} Volgende
          </button>
        </div>
      `;
    } else {
      form = html`
        <h3>
          Extra velden
        </h3>
        ${extra.map(({ label, value }, i) => html`
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Naam" id="${i}.label" value="${label}" onblur="saveExtraInput"/>
            <input type="text" class="form-control" placeholder="Waarde" id="${i}.value" value="${value}" onblur="saveExtraInput"/>
          </div>
        `)}
        <div class="actions">
          <button onclick="previousStep" class="btn btn-primary">
            ${left} Vorige
          </button>
          <div>
            <button onclick="removeInputField" class="btn btn-primary" ${extra.length ? '' : 'disabled'}>
              ${minus} Verwijderen
            </button>
            <button onclick="addInputField" class="btn btn-primary">
              ${plus} Toevoegen
            </button>
          </div>
          <button onclick="saveProduct" class="btn btn-primary">
            ${file} Opslaan
          </button>
        </div>
      `;
    }

    return html`
      <div class="container">
        <div class="jumbotron mt-4">
          <h1 class="display-4">Product aanmaken</h1>
        </div>
        ${form}
      </div>
    `;
  };

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
  };

  previousStep = () => {
    const { name, step } = this.state;

    if (!step) {
      navigate(`/${name}`);

      return;
    }

    this.set({
      ...this.state,
      step: step - 1
    });
  };

  nextStep = () => {
    const { step, values } = this.state;
    const id = Object.keys(values)[step];

    this.set({
      ...this.state,
      step: step + 1,
      values: {
        ...values,
        [id]: document.getElementById(id).value
      }
    });
  };

  saveExtraInput = (element) => {
    const { extra } = this.state;
    const [index, path] = element.id.split('.');

    this.set({
      ...this.state,
      extra: extra.map((input, i) => {
        if (String(i) !== index) {
          return input;
        }

        return {
          ...input,
          [path]: element.value
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

  };
}
