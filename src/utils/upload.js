export class Upload {
  #canvas;
  #context;

  constructor(canvas) {
    this.#canvas = canvas;
    this.#context = canvas.getContext('2d');
  }

  // eslint-disable-next-line no-undef
  #getSize() {
    return this.#canvas.getBoundingClientRect();
  }

  onUpload(e) {
    const image = new Image();
    const { width, height } = this.#getSize();

    image.src = URL.createObjectURL(e.target.files[0]);
    image.onload = () => this.#context.drawImage(image, 0, 0, width, height);
  }

  clearCanvas() {
    const { width, height } = this.#getSize();

    this.#context.clearRect(0, 0, width, height);
  }
}
