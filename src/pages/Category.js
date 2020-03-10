import { Page } from '../Page';
import { html } from '../utils/html';

export class Category extends Page {
  render() {
    return html`
      <div class="container">
        ${this.state.name}
      </div>
    `;
  }
}
