import left from '@fortawesome/fontawesome-free/svgs/solid/chevron-left.svg';
import plus from '@fortawesome/fontawesome-free/svgs/solid/plus.svg';
import { View } from '../View';
import { categoryLabels, fieldLabels } from '../constants';
import { html } from '../utils/html';

export class CategoryView extends View {
  render() {
    return html`
      <div class="container">
        <div class="row">
          <div class="col-8">
            <div class="jumbotron mt-4">
              <h1 class="display-4">${categoryLabels[this.controller.name]}</h1>
            </div>
          </div> 
          <div class="col-4">
            <div class="jumbotron mt-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Weather</h5>
                    ${this.controller.locationAvailable ? html`
                      ${!this.controller.temperature ? html`
                        <p class="card-text">
                          <div class="spinner-border text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                        </p>
                      ` : html`
                        <p class="card-text">
                          Temperatuur: ${this.controller.temperature} &#8451;
                        </p>
                      `}
                    ` : html`
                      <p class="card-text">
                        Uw locatie kan niet worden opgehaald. Sta de browser toe om dit te doen!
                      </p>
                    `}
                  <div class="input-group">
                    <input id="city" type="text" class="form-control" placeholder="Stad" value="${this.controller.city}"/>
                    <div class="input-group-append">
                      <button class="btn btn-primary" onclick="getWeatherByCity">Update</button>
                    </div>
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
          <select class="form-control" onchange="selectProduct">
            <option selected>Selecteer een product</option>
            ${this.controller.products.map((product) => html`
              <option value="${product.id}">${product.name}</option>
            `)}
          </select>
        </div>
        <div class="row">
          <div class="col-md-4">
            <ul class="list-group">
              ${Object.keys(this.controller.selectedProduct).filter((key) => key !== 'id').map((key) => html`
                ${key === 'extra' ? html`
                  ${this.controller.selectedProduct.extra.map(extra => html`
                    <li class="list-group-item">${extra.label}: ${extra.value}</li>
                  `)}
                ` : html`
                  <li class="list-group-item">${fieldLabels[key].label}: ${this.controller.selectedProduct[key]}</li>
                `}
              `)}
              ${Object.keys(this.controller.selectedProduct).length > 0 && html`
                <ul class="list-group" style="margin-top: 1rem">
                  <li class="list-group-item">Inkoopprijs (inc. BTW): ${(parseInt(this.controller.selectedProduct.purchasePrice) * 1.21).toFixed(2)}</li>
                  <li class="list-group-item">Verkoopprijs (inc. BTW): ${(parseInt(this.controller.selectedProduct.price) * 1.21).toFixed(2)}</li>
                </ul>              
              `}
            </ul>
          </div>
        </div>
      </div>
    `;
  }
}
