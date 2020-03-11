import left from '@fortawesome/fontawesome-free/svgs/solid/chevron-left.svg';
import plus from '@fortawesome/fontawesome-free/svgs/solid/plus.svg';

import { Page } from '../Page';
import { html } from '../utils/html';
import { navigate } from '../utils/navigate';
import { storage } from '../utils/storage';
import { Product } from '../models/Product';
import { categoryLabels } from '../constants';

export class Category extends Page {
  render() {
    const { name } = this.state;
    const products = storage.get(name, Product);

    return html`
      <div class="container">
        <div class="jumbotron mt-4">
          <h1 class="display-4">${categoryLabels[name]}</h1>
        </div>
        <button class="btn btn-primary" data-target="/" onclick="navigateTo">
          ${left} Terug
        </button>
        <button class="btn btn-primary" data-target="${`/${this.state.name}/create`}" onclick="navigateTo">
          ${plus} Product toevoegen
        </button>
        ${products.map((product) => html`
          <div>
            Product: ${product.name}
          </div>
        `)}
      </div>
    `;
  }

  mount() {
    const { name } = this.state;

    if (!categoryLabels[name]) {
      navigate('/');
    }
  }

  navigateTo = (element) => navigate(element.dataset.target);
}
