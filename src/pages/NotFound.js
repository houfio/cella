import { Page } from '../Page';
import { html } from '../utils/html';

export class NotFound extends Page {
  render() {
    return html`
      <div class="d-flex justify-content-center align-items-center vh-100">
        404 - Niet gevonden!
      </div>
    `;
  }
}
