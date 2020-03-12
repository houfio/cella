import { View } from '../View';
import { html } from '../utils/html';

export class HomeView extends View {
  render() {
    return html`
      <div class="container">
        <div class="jumbotron mt-4">
          <h1 class="display-4">Categorieën</h1>
          ${this.controller.categories.map(([key, label]) => html`
            <button class="btn btn-primary" onclick="navigateTo" data-target="${key}">${label}</button>
          `)}
        </div>
      </div>
    `;
  }
}
