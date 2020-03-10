import { Page } from '../Page';
import { navigate } from '../utils/navigate';
import { html } from '../utils/html';

export class Home extends Page {
  render() {
    return html`
      <div class="container">
        <div class="jumbotron mt-4">
          <h1 class="display-4">Categorieën</h1>
          <button class="btn btn-primary" onclick="navigateTo" data-target="clothing">Kleding</button>
          <button class="btn btn-primary" onclick="navigateTo" data-target="tierlantin">Tierlantijn</button>
          <button class="btn btn-primary" onclick="navigateTo" data-target="decoration">Decoratie</button>
        </div>
      </div>
    `;
  }

  navigateTo = (element) => {
    navigate(`/${element.dataset.target}`);
  };
}
