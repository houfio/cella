import { Page } from '../Page';
import { html } from '../utils/html';
import { extraFields, fieldLabels } from '../constants';
import { navigate } from '../utils/navigate';

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
      extra: {}
    }, rerender);
  };

  render() {
    const { step, values, extra } = this.state;
    const inputs = Object.keys(values);

    if (step < inputs.length) {
      const id = inputs[step];
      const value = values[id];

      return html`
        <div class="form-group">
          <label for="${id}">${fieldLabels[id]}</label>
          <input type="text" class="form-control" id="${id}" value="${value}"/>
        </div>
        <button onclick="previousStep" class="btn btn-primary">Vorige stap</button>
        <button onclick="nextStep" class="btn btn-primary">Volgende stap</button>
      `;
    }

    return html`
      ${Object.keys(extra).map((input) => html`
        <div class="form-group">
          <label for="name_${input}">Naam</label>
          <input type="text" class="form-control" id="name_${input}">
          <label for="value_${input}">Waarde</label>
          <input type="text" class="form-control" id="value_${input}">
        </div>
      `)}
      <button onclick="addInputField" class="btn btn-primary">Extra veld toevoegen</button>
      ${extra.length > 0 && html`
        <button onclick="removeInputField" class="btn btn-primary">Laatste veld verwijderen</button>
      `}
      <button onclick="saveProduct" class="btn btn-primary">Product toevoegen</button>
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
    this.set({
      ...this.state,
      step: Math.max(this.state.step - 1, 0)
    });
  };

  nextStep = () => {
    const id = Object.keys(this.state.values)[this.state.step];

    this.set({
      ...this.state,
      step: this.state.step + 1,
      values: {
        ...this.state.values,
        [id]: document.getElementById(id).value
      }
    });
  };

  addInputField = () => this.set({ ...this.state, amountOfInputs: this.state.amountOfInputs + 1 });
  removeInputField = () => this.set({ ...this.state, amountOfInputs: this.state.amountOfInputs - 1 });

  saveProduct = () => {

  };
}
