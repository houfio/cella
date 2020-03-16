import { View } from '../View';
import { TestPart } from '../parts/TestPart';
import { html } from '../utils/html';

export class HomeView extends View {
  render() {
    return (
      <>
        <div className="container">
          <div className="jumbotron mt-4">
            <h1 className="display-4">Categorieën</h1>
            {this.controller.categories.map(([key, label]) => (
              <button className="btn btn-primary" onClick={() => this.controller.navigateTo(key)}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <TestPart text="hello!">
          childen lmaooooo
          <TestPart text="world"/>
        </TestPart>
      </>
    );
  }
}
