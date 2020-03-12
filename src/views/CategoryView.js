import left from '@fortawesome/fontawesome-free/svgs/solid/chevron-left.svg';
import plus from '@fortawesome/fontawesome-free/svgs/solid/plus.svg';
import { View } from '../View';
import { categoryLabels } from '../constants';
import { html } from '../utils/html';

export class CategoryView extends View {
  render() {
    return html`
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <div class="jumbotron mt-4">
              <h1 class="display-4">${categoryLabels[this.controller.name]}</h1>
            </div>
          </div> 
          <div class="col-md-4">
            <div class="jumbotron mt-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Weather</h5>
                    ${this.controller.weather ? html`
                      <p class="card-text">
                        Temperatuur: ${this.controller.weather.main.temp} &#8451;
                      </p>
                    ` : html`
                      <p class="card-text">
                        <div class="spinner-border text-primary" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </p>
                    `}
                  </p>
                  <div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Stad" aria-label="Username" aria-describedby="basic-addon1">
  <a href="#" class="btn btn-primary">Update</a>
</div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-primary" data-target="/" onclick="navigateTo">
          ${left} Terug
        </button>
        <button class="btn btn-primary" data-target="/${this.controller.name}/create" onclick="navigateTo">
          ${plus} Product toevoegen
        </button>
        <div class="form-group">
          <select class="form-control">
            <option selected>Selecteer een product</option>
            ${this.controller.products.map((product) => html`
              <option>${product.name}</option>
            `)}
          </select>
        </div>
      </div>
    `;
  }
}
