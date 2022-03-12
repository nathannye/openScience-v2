import { WaveGroup } from "./waveGroup";

class App {
  constructor() {
    this.container = document.getElementById("soundIndicatorContainer");

    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "soundIndicator");
    this.ctx = this.canvas.getContext("2d");
    this.container.appendChild(this.canvas);

    this.waveGroup = new WaveGroup();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = 35;
    this.stageHeight = 20;
    this.canvas.height = this.stageHeight;
    this.canvas.width = this.stageWidth;
    this.ctx.scale(2, 2);

    this.waveGroup.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.waveGroup.draw(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }
}

new App();
