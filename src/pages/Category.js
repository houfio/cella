import { Page } from '../Page';
import { html } from '../utils/html';
import { navigate } from '../utils/navigate';
import { storage } from '../utils/storage';
import { Product } from '../models/Product';

export class Category extends Page {
  render() {
    const { name } = this.state;
    const products = storage.get(name, Product);

    return html`
      <div class="container">
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

  navigateTo = () => {
    navigate(`/${this.state.name}/create`);
  };
}
