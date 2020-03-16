import { View } from '../View';
import { JumboTron } from '../parts/JumboTron';
import { html } from '../utils/html';

export class HomeView extends View {
  render() {
    return (
      <div className="container">
        <JumboTron title="Categorieën">
          {this.controller.categories.map(([key, label]) => (
            <button className="btn btn-primary" onClick={() => this.controller.navigateTo(key)}>
              {label}
            </button>
          ))}
        </JumboTron>
      </div>
    );
  }
}
