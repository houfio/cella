import { Page } from '../Page';
import { html } from '../utils/html';
import { navigate } from '../utils/navigate';

export class Category extends Page {
  render() {
    return html`
      <div class="container">
        <button onclick="navigateTo">
          Product toevoegen
        </button>
      </div>
    `;
  }

  navigateTo = () => {
    navigate(`/categories/${this.state.name}/create`);
  };
}
