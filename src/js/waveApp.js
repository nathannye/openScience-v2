import { waveCurve } from "./waveCurve";

class waveApp {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.setAttributeO("id", "soundIndicator");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.wave = new waveApp();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);

    this.wave.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    //   Makes background transparent, starts at 0,0 and is equal in size to the canvas
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.wave.draw(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new waveApp();
};
