import { PeptideChain } from "./PeptideChain";

// let peptideContainer = document.querySelector("#peptideAnimationContainer");

class PeptideApp {
  constructor() {
    this.container = document.querySelector("#peptideAnimationContainer");

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.container.appendChild(this.canvas);

    this.peptideChain = new PeptideChain();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    // this.stageWidth = this.canvas.clientWidth;
    // this.stageHeight = this.canvas.clientHeight;
    this.stageWidth = 350;
    this.stageHeight = 200;
    this.canvas.height = this.stageHeight;
    this.canvas.width = this.stageWidth;
    // this.ctx.scale(2, 2);

    this.peptideChain.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.peptideChain.draw(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new PeptideApp();
};
