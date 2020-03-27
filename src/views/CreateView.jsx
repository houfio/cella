import { View } from '../View';
import { fieldLabels } from '../constants';
import { Calculator } from '../parts/Calculator';
import { Input } from '../parts/Input';
import { Jumbotron } from '../parts/Jumbotron';
import { jsx } from '../utils/jsx';

export class CreateView extends View {
  render() {
    const step = this.controller.step;
    const entries = this.controller.values;
    const id = entries[step]?.[0];

    return (
      <div className="container">
        <Jumbotron title="Product aanmaken"/>
        <div className="row">
          <div className="col-4">
            <ul className="list-group overflow-hidden text-nowrap mb-3">
              {entries.map(([key, value], index) => (
                <li
                  className={`list-group-item list-group-item-action${step === index ? ' active' : ''}`}
                  onClick={() => this.controller.toStep(index)}
                >
                  {fieldLabels[key].label}: {value}
                </li>
              ))}
            </ul>
            <Calculator value={this.controller.calculatorValue} setValue={this.controller.setCalculatorValue}/>
          </div>
          <div className="col-8">
            {this.controller.error && (
              <div className="alert alert-danger" role="alert">
                Sommige velden zijn niet/onjuist ingevuld. Corrigeer deze velden.
              </div>
            )}
            {!this.controller.addingExtra ? (
              <Input id={id} step={step} entries={entries} previousStep={this.controller.previousStep} nextStep={this.controller.nextStep}/>
            ) : (
              <>
                <h3>
                  Extra velden
                </h3>
                {this.controller.extra.map(({ label, value }, i) => (
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Naam"
                      value={label}
                      onBlur={(e) => this.controller.saveExtraInput(e, i, 'label')}
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Waarde"
                      value={value}
                      onBlur={(e) => this.controller.saveExtraInput(e, i, 'value')}
                    />
                  </div>
                ))}
                <div className="d-flex justify-content-between">
                  <button onClick={this.controller.previousStep} className="btn btn-primary">
                    Vorige
                  </button>
                  <div className="btn-group">
                    <button onClick={this.controller.removeInputField} className="btn btn-primary" disabled={Boolean(!this.controller.extraCount)}>
                      Verwijderen
                    </button>
                    <button onClick={this.controller.addInputField} className="btn btn-primary">
                      Toevoegen
                    </button>
                  </div>
                  <button onClick={this.controller.saveProduct} className="btn btn-primary">
                    Opslaan
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
