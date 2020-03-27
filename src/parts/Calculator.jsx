import { Part } from '../Part';
import { jsx } from '../utils/jsx';

export class Calculator extends Part {
  render() {


    const { value, setValue } = this.props;
    const result = this.calculate();

    return (
      <div className="row">
        <div className="col-auto">
          <div className="row">
            <div className="col-4 p-0">
              <span>{value}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-4 p-0">
              <button className="btn btn-primary h-100 w-100" onClick={() => setValue('')}>C</button>
            </div>
            <div className="col-8 p-0">
              <button className="btn btn-primary h-100 w-100" onClick={() => setValue(value.slice(0, -1))}>Back</button>
            </div>
          </div>
          <div className="row">
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100" onClick={this.append('7')}>7</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100" onClick={this.append('8')}>8</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100" onClick={this.append('9')}>9</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100" onClick={this.append('+')}>+</button>
            </div>
          </div>
          <div className="row">
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100" onClick={this.append('4')}>4</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100" onClick={this.append('5')}>5</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100" onClick={this.append('6')}>6</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100" onClick={this.append('-')}>-</button>
            </div>
          </div>
          <div className="row">
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100" onClick={this.append('1')}>1</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100" onClick={this.append('2')}>2</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100" onClick={this.append('3')}>3</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100" onClick={this.append('/')}>/</button>
            </div>
          </div>
          <div className="row">
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100" onClick={this.append('0')}>0</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100" onClick={this.append('.')}>.</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100" onClick={() => setValue(result)} disabled={result === null}>=</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100" onClick={this.append('*')}>*</button>
            </div>
          </div>
        </div>
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
      return eval(value);
    } catch (e) {
      return null;
    }
  };
}
