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
        <button class="btn btn-primary" onclick="navigateTo">
          Product toevoegen
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

  navigateTo = () => {
    navigate(`/${this.state.name}/create`);
  };
}
