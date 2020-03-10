import { Page } from '../Page';

export class Category extends Page {
  render() {
    return `
      <div class="container">
        ${this.state.name}
      </div>
    `;
  }
}
