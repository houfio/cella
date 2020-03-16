export class Upload {
  #context;

  constructor(canvas) {
    this.#context = canvas.getContext('2d');
  }

  onUpload(e) {
    const image = new Image();
    image.src = URL.createObjectURL(e.target.files[0]);
    image.onload = () => this.#context.drawImage(image, 0, 0);
  }

  clearCanvas() {
    this.#context.clearRect(0, 0, 400, 400);
  }
}
