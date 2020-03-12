import left from '@fortawesome/fontawesome-free/svgs/solid/chevron-left.svg';
import plus from '@fortawesome/fontawesome-free/svgs/solid/plus.svg';

import { html } from '../utils/html';
import { categoryLabels } from '../constants';
import { View } from '../View';

export class CategoryView extends View {
  render() {
    return html`
      <div class="container">
        <div class="jumbotron mt-4">
          <h1 class="display-4">${categoryLabels[this.controller.name]}</h1>
        </div>
        <button class="btn btn-primary" data-target="/" onclick="navigateTo">
          ${left} Terug
        </button>
        <button class="btn btn-primary" data-target="/${this.controller.name}/create" onclick="navigateTo">
          ${plus} Product toevoegen
        </button>
        ${this.controller.products.map((product) => html`
          <div>
            Product: ${product.name}
          </div>
        `)}
      </div>
    `;
  }
}
