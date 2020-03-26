import { View } from '../View';
import { Jumbotron } from '../parts/Jumbotron';
import { html } from '../utils/html';

export class HomeView extends View {
  render() {
    return (
      <div className="container">
        <Jumbotron title="Categorieën"/>
        <div className="btn-group">
          {this.controller.categories.map(([key, label]) => (
            <button className="btn btn-primary" onClick={() => this.controller.navigateTo(key)}>
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
