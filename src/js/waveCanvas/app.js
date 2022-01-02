import { WaveGroup } from "./waveGroup";
// import { Point } from "./point";
// import gsap from "gsap/all";

class App {
  constructor() {
    this.container = document.querySelector("#soundIndicatorContainer");
    document.body.appendChild(this.container);

    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "soundIndicator");
    this.ctx = this.canvas.getContext("2d");
    this.container.appendChild(this.canvas);

    this.waveGroup = new WaveGroup();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    // let point = new Point();
    // gsap.set(point, {
    //   amplitude: 32,
    // });

    // var sound = true;

    // if (sound) {
    //   console.log("sound is now off");
    //   var sound = false;
    //   point.amplitude = 0;
    // } else {
    //   console.log("sound is now on");
    //   point.amplitude = 30;
    //   var sound = true;
    // }
    // });
    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    // this.stageWidth = this.canvas.clientWidth;
    // this.stageHeight = this.canvas.clientHeight;
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

window.onload = () => {
  new App();
};
