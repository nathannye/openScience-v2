import { wavePoint } from "./wavePoint";

export class waveCurve {
  constructor() {}
  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    this.init();
  }

  init() {
    this.point = new wavePoint(this.centerX, this.centerY);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "green";

    this.point.update();

    ctx.arc(this.point.x, this.point.y, 30, 0, 2 * Math.PI);
    ctx.fill();
  }
}
