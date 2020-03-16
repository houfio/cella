export class ImageUpload {
  #input;
  #canvas;
  #context;

  constructor(input, canvas) {
    this.#input = input;
    this.#canvas = canvas;
    this.#context = canvas.getContext('2d');
  }

  setListener() {
    const hiddenImage = new Image();
    hiddenImage.src = URL.createObjectURL(this.#input.files[0]);
    hiddenImage.onload = () => {
      this.#context.drawImage(hiddenImage, 0, 0);
    };
  }

  clearCanvas() {
    this.#context.clearRect(0, 0, 400, 400);
  }

  get base64() {
    return this.#canvas.toDataURL();
  }
}
