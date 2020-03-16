import Left from '@fortawesome/fontawesome-free/svgs/solid/chevron-left.svg';
import File from '@fortawesome/fontawesome-free/svgs/solid/file.svg';
import Minus from '@fortawesome/fontawesome-free/svgs/solid/minus.svg';
import Plus from '@fortawesome/fontawesome-free/svgs/solid/plus.svg';
import { View } from '../View';
import { fieldLabels } from '../constants';
import { Input } from '../parts/Input';
import { JumboTron } from '../parts/JumboTron';
import { html } from '../utils/html';

export class CreateView extends View {
  render() {
    const step = this.controller.step;
    const entries = this.controller.values;
    const id = entries[step]?.[0];

    return (
      <div className="container">
        <JumboTron title="Product aanmaken"/>
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
                <Input id={id} step={step} entries={entries} previousStep={this.controller.previousStep} nextStep={this.controller.nextStep}/>
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
                    <Left/> Vorige
                  </button>
                  <div>
                    <button onClick={this.controller.removeInputField} className="btn btn-primary" disabled={Boolean(this.controller.extraCount)}>
                      <Minus/> Verwijderen
                    </button>
                    <button onClick={this.controller.addInputField} className="btn btn-primary">
                      <Plus/> Toevoegen
                    </button>
                  </div>
                  <button onClick={this.controller.saveProduct} className="btn btn-primary">
                    <File/> Opslaan
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
