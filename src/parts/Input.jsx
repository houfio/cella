import Left from '@fortawesome/fontawesome-free/svgs/solid/chevron-left.svg';
import Right from '@fortawesome/fontawesome-free/svgs/solid/chevron-right.svg';
import { Part } from '../Part';
import { fieldLabels } from '../constants';
import { html } from '../utils/html';

export class Input extends Part {
  render() {
    const { id, step, entries, previousStep, nextStep } = this.props;

    return (
      <>
        <div className="form-group">
          <label htmlFor={id}>{fieldLabels[id].label}</label>
          <input id={id} type={fieldLabels[id].type} className="form-control" value={entries[step][1]}/>
        </div>
        <div className="d-flex justify-content-between">
          <button onClick={previousStep} className="btn btn-primary">
            <Left/> {step ? 'Vorige' : 'Annuleren'}
          </button>
          <button onClick={nextStep} className="btn btn-primary">
            <Right/> Volgende
          </button>
        </div>
      </>
    );
  }
}
