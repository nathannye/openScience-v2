import Component from "../classes/Component";

export default class Wave extends Component {
  constructor() {
    super({
      element: "#soundIndicatorContainer",
      elements: {},
    });
  }

  create() {
    super.create();
    this.wave = {
      amplitude: 0,
      wavelength: 0.33,
      frequency: 0.125,
      increment: 0.05,
    };
    this.createWave();
    this.animate();
  }

  createWave() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 35 * 4;
    this.canvas.height = 20 * 4;
    this.ctx.scale(4, 4);
    this.ctx.strokeWidth = 30;
    this.ctx.strokeStyle = "#FFE65C";
    this.canvas.setAttribute("id", "soundIndicator");
    this.element.appendChild(this.canvas);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();

    // Move from top left to middle left
    this.ctx.moveTo(0, this.canvas.height / 8);

    for (let i = 0; i < this.canvas.width * 4; i++) {
      this.ctx.lineTo(
        i,
        this.canvas.height / 8 +
          Math.sin(i * this.wave.wavelength + this.wave.increment) *
            this.wave.amplitude
      );
    }
    this.ctx.stroke();
    this.wave.increment += this.wave.frequency;
  }
}
