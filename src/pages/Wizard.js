import { Page } from '../Page';

export class Wizard extends Page {
  constructor(state, rerender) {
    super({
      ...state,
      step: 0,
      inputData: {
        name: ['Naam'],
        description: ['Beschrijving'],
        purchasePrice: ['Inkoopprijs'],
        price: ['Verkoopprijs'],
        stock: ['Voorraad'],
        minimum_stock: ['Minimum voorraad']
      }
    }, rerender);
  }

  render() {
    const id = Object.keys(this.state.inputData)[this.state.step];
    const label = Object.values(this.state.inputData)[this.state.step][0];

    return `
      ${this.state.step <= Object.keys(this.state.inputData).length ? `
        <div class="form-group">
          <label for="${id}">${label}</label>
          <input type="text" class="form-control" id="${id}">
        </div>
        <button onclick="nextStep" class="btn btn-primary">Volgende stap</button>`
      : `
        <p>Wil je nieuwe shitty?</p>
      `}
    `;
  }

  mount() {
    let extraFields = [];

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
  }

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
}
