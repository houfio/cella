import Left from '@fortawesome/fontawesome-free/svgs/solid/chevron-left.svg';
import Plus from '@fortawesome/fontawesome-free/svgs/solid/plus.svg';
import { View } from '../View';
import { categoryLabels, fieldLabels } from '../constants';
import { html } from '../utils/html';

export class CategoryView extends View {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className="jumbotron mt-4">
              <h1 className="display-4">{categoryLabels[this.controller.name]}</h1>
            </div>
          </div>
          <div className="col-4">
            <div className="jumbotron mt-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Weather</h5>
                  {this.controller.locationAvailable ? this.controller.temperature ? (
                    <p className="card-text">
                      Temperatuur: {this.controller.temperature} &#8451;
                    </p>
                  ) : (
                    <p className="card-text">
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </p>
                  ) : (
                    <p className="card-text">
                      Uw locatie kan niet worden opgehaald. Sta de browser toe om dit te doen!
                    </p>
                  )}
                  <div className="input-group">
                    <input
                      id="city"
                      type="text"
                      className="form-control"
                      placeholder="Stad"
                      value={this.controller.city}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" onClick={this.controller.getWeatherByCity}>Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => this.controller.navigateTo('/')}>
          <Left/> Terug
        </button>
        <button className="btn btn-primary" onClick={() => this.controller.navigateTo(`/${this.controller.name}/create`)}>
          <Plus/> Product toevoegen
        </button>
        <div className="form-group">
          <select className="form-control" onChange={this.controller.selectProduct}>
            <option selected>Selecteer een product</option>
            {this.controller.products.map((product) => (
              <option value={product.id}>{product.name}</option>
            ))}
          </select>
        </div>
        <div className="row">
          <div className="col-4">
            <ul className="list-group">
              {Object.keys(this.controller.selectedProduct).filter((key) => key !== 'id').map((key) => key !== 'extra' ? (
                <li className="list-group-item">{fieldLabels[key].label}: {this.controller.selectedProduct[key]}</li>
              ) : this.controller.selectedProduct.extra.map((extra) => (
                <li className="list-group-item">{extra.label}: {extra.value}</li>
              )))}
            </ul>
          </div>
          <div className="col-6">
            <input onChange={this.controller.onUpload} type="file" id="product_image"/>
            <canvas id="product_canvas" width="400" height="400" style="border: 2px solid black"/>
          </div>
        </div>
      </div>
    );
  }
}
