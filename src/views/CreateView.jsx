import left from '@fortawesome/fontawesome-free/svgs/solid/chevron-left.svg';
import right from '@fortawesome/fontawesome-free/svgs/solid/chevron-right.svg';
import file from '@fortawesome/fontawesome-free/svgs/solid/file.svg';
import minus from '@fortawesome/fontawesome-free/svgs/solid/minus.svg';
import plus from '@fortawesome/fontawesome-free/svgs/solid/plus.svg';
import { View } from '../View';
import { fieldLabels } from '../constants';
import { html } from '../utils/html';

export class CreateView extends View {
  render() {
    const step = this.controller.step;
    const entries = this.controller.values;
    const id = entries[step]?.[0];

    return (
      <div className="container">
        <div className="jumbotron mt-4">
          <h1 className="display-4">Product aanmaken</h1>
        </div>
        <div className="row">
          <div className="col-4">
            <ul className="list-group overflow-hidden text-nowrap">
              {entries.map(([key, value], index) => (
                <li
                  className={`list-group-item list-group-item-action${step === index ? ' active' : ''}`}
                  onClick={() => this.controller.toStep(index)}
                >
                  {fieldLabels[key].label}: {value}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-8">
            {!this.controller.addingExtra ? (
              <div>
                <div className="form-group">
                  <label htmlFor={id}>{fieldLabels[id].label}</label>
                  <input id={id} type={fieldLabels[id].type} className="form-control" value={entries[step][1]}/>
                </div>
                <div className="d-flex justify-content-between">
                  <button onClick={this.controller.previousStep} className="btn btn-primary">
                    {left} {step ? 'Vorige' : 'Annuleren'}
                  </button>
                  <button onClick={this.controller.nextStep} className="btn btn-primary">
                    {right} Volgende
                  </button>
                </div>
              </div>
            ) : (
              <div>
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
                    {left} Vorige
                  </button>
                  <div>
                    <button onClick={this.controller.removeInputField} className="btn btn-primary" disabled={Boolean(this.controller.extraCount)}>
                      {minus} Verwijderen
                    </button>
                    <button onClick={this.controller.addInputField} className="btn btn-primary">
                      {plus} Toevoegen
                    </button>
                  </div>
                  <button onClick={this.controller.saveProduct} className="btn btn-primary">
                    {file} Opslaan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
