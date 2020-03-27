import { Part } from '../Part';
import { jsx } from '../utils/jsx';

export class Calculator extends Part {
  render() {
    return (
      <div className="row">
        <div className="col-auto">
          <div className="row">
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100">7</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100">8</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100">9</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100">+</button>
            </div>
          </div>
          <div className="row">
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100">4</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100">5</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100">6</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100">-</button>
            </div>
          </div>
          <div className="row">
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100">1</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100">2</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100">3</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100">/</button>
            </div>
          </div>
          <div className="row">
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100">0</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100">.</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100">=</button>
            </div>
            <div className="col-3 p-0">
              <button className="btn btn-primary h-100 w-100">x</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
