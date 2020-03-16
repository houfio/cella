export class Part {
  #props;

  constructor(props) {
    this.#props = props;
  }

  get props() {
    return this.#props;
  }

  render() {
    throw new Error('Method \'render()\' must be implemented');
  }
}
