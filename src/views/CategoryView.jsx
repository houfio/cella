import { View } from '../View';
import { categoryLabels, fieldLabels } from '../constants';
import { Jumbotron } from '../parts/Jumbotron';
import { html } from '../utils/html';
import { range } from '../utils/range';

export class CategoryView extends View {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8">
            <Jumbotron title={categoryLabels[this.controller.name]}/>
          </div>
          <div className="col-4">
            <div className="jumbotron mt-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Weather</h5>
                  {this.controller.temperature === undefined ? (
                    <p className="card-text">
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </p>
                  ) : this.controller.temperature === null ? (
                    <p className="card-text">
                      Uw locatie kan niet worden opgehaald. Sta de browser toe om dit te doen!
                    </p>
                  ) : (
                    <p className="card-text">
                      Temperatuur: {this.controller.temperature} &#8451;
                    </p>
                  )}
                  <div className="input-group">
                    <select id="city" className="form-control">
                      {this.controller.cities.map((city) => (
                        <option selected={this.controller.city === city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <div className="input-group-append">
                      <button className="btn btn-primary" onClick={this.controller.getWeather}>Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => this.controller.navigateTo('/')}>
          Terug
        </button>
        <button className="btn btn-primary" onClick={() => this.controller.navigateTo(`/${this.controller.name}/create`)}>
          Product toevoegen
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
              {Object.keys(this.controller.selectedProduct).length > 0 && (
                <ul className="list-group" style="margin-top: 1rem">
                  <li className="list-group-item">Inkoopprijs (inc. BTW): {(parseInt(this.controller.selectedProduct.purchasePrice) * 1.21).toFixed(2)}</li>
                  <li className="list-group-item">Verkoopprijs (inc. BTW): {(parseInt(this.controller.selectedProduct.price) * 1.21).toFixed(2)}</li>
                </ul>
              )}
            </ul>
          </div>
          <div className="col-8">
            <div className="grid">
              {range(0, 225).map(() => (
                <div className="grid-item"/>
              ))}
            </div>
            <input onChange={this.controller.onUpload} type="file" id="product_image"/>
            <canvas
              onMouseMove={this.controller.mouseMove}
              onMouseUp={this.controller.mouseUp}
              onMouseDown={this.controller.mouseDown}
              id="product_canvas"
              width="400"
              height="400"
              style="border: 2px solid black"
            />
          </div>
        </div>
      </div>
    );
  }
}
