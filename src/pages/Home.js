import { Page } from '../Page';
import { navigate } from '../utils/navigate';

export class Home extends Page {
  render() {
    return `
      <div class="container">
        <div class="jumbotron mt-4">
          <button class="btn btn-primary" onclick="navigateTo" data-target="tierlantin">tierlantin</button>
        </div>
      </div>
    `;
  }

  navigateTo = (element) => {
    navigate(`/category/${element.dataset.target}`);
  };
}
