import { Part } from '../Part';
import { html } from '../utils/html';

export class TestPart extends Part {
  render() {
    const { text, children } = this.props;

    return (
      <div>
        {text}
        {children}
      </div>
    );
  }
}
