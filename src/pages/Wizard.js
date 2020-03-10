import { Page } from "../Page";

export class Wizard extends Page {
  constructor(state, rerender) {
    super({
      ...state,
      step: 0,
      inputData: {
        name: "Naam",
        description: "Beschrijving",
        purchasePrice: "Inkoopprijs",
        price: "Verkoopprijs",
        stock: "Voorraad",
        minimum_stock: "Minimum voorraad",
      }
    }, rerender);
  }

  render() {
    return `
      <div class="form-group">
        <label for="${Object.keys(this.state.inputData)[this.state.step]}">${Object.values(this.state.inputData)[this.state.step]}</label>
        <input type="text" class="form-control" id="${Object.keys(this.state.inputData)[this.state.step]}">
      </div>
      <button onclick="nextStep" class="btn btn-primary">Volgende stap</button>
    `;
  }

  nextStep = (element) => {
    console.log(element);

    this.set({
      ...this.state,
      step: this.state.step + 1
    });
  };
}
