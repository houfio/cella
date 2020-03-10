import { Page } from '../Page';

export class Home extends Page {
  render() {
    return `
      <span>
        ${this.state.count}
      </span>
    `;
  }

  mount() {
    this.increase();
  }

  unmount() {
    console.log('unmount');
  }

  increase = () => {
    this.set({
      count: (this.state.count || 0) + 1
    });

    setTimeout(this.increase, 1000);
  };
}
