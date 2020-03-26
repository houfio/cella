import { Part } from '../Part';
import { jsx } from '../utils/jsx';

export class Jumbotron extends Part {
  render() {
    const { title, children } = this.props;

    return (
      <div className="jumbotron mt-4">
        <h1 className="display-4">{title}</h1>
        {children}
      </div>
    );
  }
}
