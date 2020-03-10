import { Page } from '../Page';
import { range } from "../utils/range";
import { html } from '../utils/html';

export class Wizard extends Page {
  constructor(state, rerender) {
    super({
      ...state,
      step: 0,
      amountOfInputs: 0,
      inputData: {
        name: ['Naam'],
        description: ['Beschrijving'],
        purchasePrice: ['Inkoopprijs'],
        price: ['Verkoopprijs'],
        stock: ['Voorraad'],
        minimum_stock: ['Minimum voorraad']
      }
    }, rerender);
  };

  render() {
    let id = '';
    let label = '';

    if (this.state.step < Object.keys(this.state.inputData).length) {
      id = Object.keys(this.state.inputData)[this.state.step];
      label = Object.values(this.state.inputData)[this.state.step][0];
    }

    return html`
      ${this.state.step < Object.keys(this.state.inputData).length ? html`
        <div class="form-group">
          <label for="${id}">${label}</label>
          <input type="text" class="form-control" id="${id}">
        </div>
        <button onclick="nextStep" class="btn btn-primary">Volgende stap</button>`
      : html`
        ${range(0, this.state.amountOfInputs).map(i => html`
          <div class="form-group">
            <label for="name_${i}">Naam</label>
            <input type="text" class="form-control" id="name_${i}">
            <label for="value_${i}">Waarde</label>
            <input type="text" class="form-control" id="value_${i}">
          </div>
        `)}
        <button onclick="addInputField" class="btn btn-primary">Extra veld toevoegen</button>
        ${this.state.amountOfInputs > 0 && html`
          <button onclick="removeInputField" class="btn btn-primary">Laatste veld verwijderen</button>
        `}
        <button onclick="saveProduct" class="btn btn-primary">Product toevoegen</button>
      `}
    `;
  };

  mount() {
    let extraFields;

    switch (this.state.name) {
      case 'decoration':
        extraFields = [
          {
            key: 'size',
            label: 'Grootte'
          },
          {
            key: 'color',
            label: 'Kleur'
          },
          {
            key: 'package_amount',
            label: 'Aantal per verpakking'
          }
        ];
        break;
      case 'tierlantin':
        extraFields = [
          {
            key: 'weight',
            label: 'Gewicht'
          }
        ];
        break;
      default:
        extraFields = [
          {
            key: 'color',
            label: 'Kleur'
          },
          {
            key: 'size',
            label: 'Grootte'
          }
        ];
        break;
    }

    this.set({
      ...this.state,
      inputData: {
        ...this.state.inputData,
        ...extraFields.reduce((previous, current) => ({
          ...previous,
          [current.key]: [current.label]
        }), {})
      }
    });
  };

  nextStep = () => {
    const id = Object.keys(this.state.inputData)[this.state.step];

    this.set({
      ...this.state,
      step: this.state.step + 1,
      inputData: {
        ...this.state.inputData,
        [id]: [
          ...this.state.inputData[id],
          document.getElementById(id).value
        ]
      }
    });
  };

  addInputField = () => this.set({ ...this.state, amountOfInputs: this.state.amountOfInputs + 1 });
  removeInputField = () => this.set({ ...this.state, amountOfInputs: this.state.amountOfInputs - 1 });

  saveProduct = () => {

  };
}
