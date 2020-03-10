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
        <button onclick="previousStep" class="btn btn-primary" ${step ? '' : 'disabled'}>Vorige stap</button>
        <button onclick="nextStep" class="btn btn-primary">Volgende stap</button>
      `;
    } else {
      form = html`
        ${extra.map(({ label, value }, i) => html`
          <div class="form-group">
            <label for="${i}.label">Naam</label>
            <input type="text" class="form-control" id="${i}.label" value="${label}" onblur="saveExtraInput"/>
            <label for="${i}.value">Waarde</label>
            <input type="text" class="form-control" id="${i}.value" value="${value}" onblur="saveExtraInput"/>
          </div>
        `)}
        <button onclick="previousStep" class="btn btn-primary" >Vorige stap</button>
        <button onclick="addInputField" class="btn btn-primary">Extra veld toevoegen</button>
        <button onclick="removeInputField" class="btn btn-primary" ${extra.length ? '' : 'disabled'}>
          Laatste veld verwijderen
        </button>
        <button onclick="saveProduct" class="btn btn-primary">Product toevoegen</button>
      `;
    }

    return html`
      <div class="container">
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
    this.set({
      ...this.state,
      step: Math.max(this.state.step - 1, 0)
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
