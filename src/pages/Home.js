import { Page } from '../Page';
import { navigate } from '../utils/navigate';
import { html } from '../utils/html';

export class Home extends Page {
  render() {
    return html`
      <div class="container">
        <div class="jumbotron mt-4">
          <button class="btn btn-primary" onclick="navigateTo">Categorieën</button>
        </div>
      </div>
    `;
  }

  navigateTo = () => {
    navigate(`/categories`);
  };
}
