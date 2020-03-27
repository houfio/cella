import { Part } from '../Part';
import { jsx } from '../utils/jsx';

export class Calculator extends Part {
  render() {
    const { value, setValue } = this.props;
    const result = this.calculate();

    return (
      <div className="calculator">
        <div className="column-span-4 result">{value || '0'}</div>
        <button className="btn btn-primary column-span-2" onClick={() => setValue(value.slice(0, -1))}>Back</button>
        <button className="btn btn-primary" onClick={() => setValue('')}>C</button>
        <button className="btn btn-primary" onClick={this.append('+')}>+</button>
        <button className="btn btn-primary" onClick={this.append('7')}>7</button>
        <button className="btn btn-primary" onClick={this.append('8')}>8</button>
        <button className="btn btn-primary" onClick={this.append('9')}>9</button>
        <button className="btn btn-primary" onClick={this.append('-')}>-</button>
        <button className="btn btn-primary" onClick={this.append('4')}>4</button>
        <button className="btn btn-primary" onClick={this.append('5')}>5</button>
        <button className="btn btn-primary" onClick={this.append('6')}>6</button>
        <button className="btn btn-primary" onClick={this.append('/')}>/</button>
        <button className="btn btn-primary" onClick={this.append('1')}>1</button>
        <button className="btn btn-primary" onClick={this.append('2')}>2</button>
        <button className="btn btn-primary" onClick={this.append('3')}>3</button>
        <button className="btn btn-primary" onClick={this.append('*')}>*</button>
        <button className="btn btn-primary column-span-2" onClick={this.append('0')}>0</button>
        <button className="btn btn-primary" onClick={this.append('.')}>.</button>
        <button className="btn btn-primary" onClick={() => setValue(result)} disabled={result === null}>=</button>
      </div>
    );
  }

  append = (character) => () => {
    const { setValue, value } = this.props;
    setValue(value + character);
  };

  calculate = () => {
    const { value } = this.props;

    try {
      return eval(value).toString();
    } catch (e) {
      return null;
    }
  };
}
