import { View } from '../View';
import { html } from '../utils/html';

export class NotFoundView extends View {
  render() {
    return html`
      <div class="d-flex justify-content-center align-items-center vh-100">
        404 - Niet gevonden!
      </div>
    `;
  }
}
