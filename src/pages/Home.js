import { Page } from '../Page';
import { navigate } from '../utils/navigate';
import { html } from '../utils/html';
import { categoryLabels } from '../constants';

export class Home extends Page {
  render() {
    return html`
      <div class="container">
        <div class="jumbotron mt-4">
          <h1 class="display-4">Categorieën</h1>
          ${Object.entries(categoryLabels).map(([key, label]) => html`
            <button class="btn btn-primary" onclick="navigateTo" data-target="${key}">${label}</button>
          `)}
        </div>
      </div>
    `;
  }

  navigateTo = (element) => {
    navigate(`/${element.dataset.target}`);
  };
}
