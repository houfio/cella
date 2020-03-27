import { View } from '../View';
import { categoryLabels, fieldLabels } from '../constants';
import { GridElement } from '../parts/GridElement';
import { Jumbotron } from '../parts/Jumbotron';
import { jsx } from '../utils/jsx';
import { range } from '../utils/range';

export class CategoryView extends View {
  render() {
    const product = this.controller.product;

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
                  <select id="city" className="form-control custom-select" onChange={this.controller.getWeather}>
                    {this.controller.cities.map((city) => (
                      <option selected={this.controller.city === city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="input-group mb-4">
          <div className="input-group-prepend">
            <button className="btn btn-primary" onClick={() => this.controller.navigateTo('/')}>
              Terug
            </button>
          </div>
          <select className="form-control custom-select" onChange={this.controller.selectProduct}>
            <option>Selecteer een product...</option>
            {this.controller.products.map((product) => (
              <option
                selected={this.controller.product?.id === product.id}
                value={product.id}
              >
                {product.name}
              </option>
            ))}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              onClick={() => this.controller.navigateTo(`/${this.controller.name}/create`)}
            >
              Product toevoegen
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            {product && (
              <>
                <div className="d-flex justify-content-end mb-3">
                  <div
                    style={`width: calc(100% / 7.5); background-image: url(${this.controller.product.image})`}
                    className="drag-source force-square"
                    id="square"
                    draggable={true}
                    onDragStart={this.controller.drag}
                  />
                </div>
                <ul className="list-group mb-3">
                  {Object.entries(product).filter(([key]) => key !== 'id' && key !== 'image').map(([key, value]) => key !== 'extra' ? (
                    <li className="list-group-item">{fieldLabels[key].label}: {value}</li>
                  ) : value.map(({ label, value: v }) => (
                    <li className="list-group-item">{label}: {v}</li>
                  )))}
                </ul>
                <ul className="list-group mb-3">
                  <li className="list-group-item">Inkoopprijs (inc.
                    BTW): {(parseInt(product.purchasePrice || 0) * 1.21).toFixed(2)}</li>
                  <li className="list-group-item">Verkoopprijs (inc.
                    BTW): {(parseInt(product.price || 0) * 1.21).toFixed(2)}</li>
                </ul>
                <div className="input-group mb-3">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="product_image"
                      onChange={this.controller.onUpload}
                    />
                    <label className="custom-file-label" htmlFor="product_image">Choose file</label>
                  </div>
                  <div className="input-group-append">
                    <button onClick={this.controller.saveCanvas} className="btn btn-primary">
                      Save
                    </button>
                    <button onClick={() => this.controller.navigateTo(`/${this.controller.name}/${product.id}`)} className="btn btn-light">
                      Edit product
                    </button>
                  </div>
                </div>
                <canvas
                  onMouseMove={this.controller.handleDraw}
                  onMouseDown={this.controller.handleDraw}
                  id="product_canvas"
                  className="border border-dark"
                  width="348"
                  height="348"
                />
              </>
            )}
          </div>
          <div className="col-8">
            <div className="grid">
              {range(0, 225).map((i) => (
                <GridElement
                  image={this.controller.getProductImage(i)}
                  onDrop={(e) => this.controller.drop(e, i)}
                  onRemove={(e) => this.controller.removeProduct(e, i)}
                  dataBlocked={this.controller.isBlocked(i)}
                  dataProduct={this.controller.hasProduct(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
