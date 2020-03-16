export class Drawer {
  #enabled = false;
  #context;
  #x = 0;
  #y = 0;

  mouseDown(e) {
    this.#enabled = true;
    this.#context.beginPath();
    this.#setPosition(e);
  }

  mouseUp() {
    this.#enabled = false;
  }

  draw(e) {
    if (this.#enabled) {
      this.#context.moveTo(this.#x, this.#y);
      this.#setPosition(e);
      this.#context.lineTo(this.#x, this.#y);
      this.#context.stroke();
    }
  }

  setCanvas(canvas) {
    this.#context = canvas.getContext('2d');
    this.#context.lineWidth = 5;
    this.#context.lineCap = 'round';
    this.#context.strokeStyle = '#c0392b';
  }

  // eslint-disable-next-line no-undef
  #setPosition(e) {
    this.#x = e.clientX;
    this.#y = e.clientY;
  }
}
