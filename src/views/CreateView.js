import plus from '@fortawesome/fontawesome-free/svgs/solid/plus.svg';
import minus from '@fortawesome/fontawesome-free/svgs/solid/minus.svg';
import left from '@fortawesome/fontawesome-free/svgs/solid/chevron-left.svg';
import right from '@fortawesome/fontawesome-free/svgs/solid/chevron-right.svg';
import file from '@fortawesome/fontawesome-free/svgs/solid/file.svg';

import { html } from '../utils/html';
import { fieldLabels } from '../constants';
import { View } from '../View';

export class CreateView extends View {
  render() {
    const step = this.controller.step;
    const entries = this.controller.values;
    let form;

    if (!this.controller.addingExtra) {
      const id = entries[step][0];

      form = html`
        <div class="form-group">
          <label for="${id}">${fieldLabels[id]}</label>
          <input type="text" class="form-control" id="${id}" value="${entries[step][1]}"/>
        </div>
        <div class="d-flex justify-content-between">
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
        ${this.controller.extra.map(({ label, value }, i) => html`
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Naam" id="${i}.label" value="${label}" onblur="saveExtraInput"/>
            <input type="text" class="form-control" placeholder="Waarde" id="${i}.value" value="${value}" onblur="saveExtraInput"/>
          </div>
        `)}
        <div class="d-flex justify-content-between">
          <button onclick="previousStep" class="btn btn-primary">
            ${left} Vorige
          </button>
          <div>
            <button onclick="removeInputField" class="btn btn-primary" ${this.controller.extraCount ? '' : 'disabled'}>
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
        <div class="row">
          <div class="col-4">
            <ul class="list-group overflow-hidden text-nowrap">
              ${entries.map(([key, value], index) => html`
                <li class="list-group-item list-group-item-action${step === index ? ' active' : ''}" data-step="${index}" onclick="toStep">
                  ${fieldLabels[key]}: ${value}
                </li>
              `)}
            </ul>
          </div>
          <div class="col-8">
            ${form}
          </div>
        </div>
      </div>
    `;
  };
}
