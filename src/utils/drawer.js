export class Drawer {
  #canvas;
  #context;
  #x = 0;
  #y = 0;

  constructor(canvas) {
    this.#canvas = canvas;
    this.#context = canvas.getContext('2d');
    this.#context.lineWidth = 5;
    this.#context.lineJoin = 'round';
    this.#context.lineCap = 'round';
    this.#context.strokeStyle = 'orange';
  }

  get base64() {
    return this.#canvas.toDataURL();
  }

  // eslint-disable-next-line no-undef
  #setPosition(e) {
    const { x, y } = e.target.getBoundingClientRect();

    this.#x = e.clientX - x;
    this.#y = e.clientY - y;
  }

  fillCanvas(base64) {
    const image = new Image();
    image.onload = () => this.#context.drawImage(image, 0, 0);
    image.src = base64;
  }

  draw(e) {
    if (e.buttons !== 1) {
      return;
    }

    if (e.type === 'mousedown') {
      this.#setPosition(e);
    }

    this.#context.beginPath();
    this.#context.moveTo(this.#x, this.#y);
    this.#setPosition(e);
    this.#context.lineTo(this.#x, this.#y);
    this.#context.closePath();
    this.#context.stroke();
  }
}
