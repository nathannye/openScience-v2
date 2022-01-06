import PeptidePoint from "./PeptidePoint";

export class PeptideLine {
  constructor(index, totalPoints, color) {
    this.index = index;
    this.totalPoints = totalPoints;
    this.color = color;
    this.points = [];
  }
  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    this.pointGap = this.stageHeight / (this.totalPoints - 1);

    this.init();
  }
  init() {
    this.points = [];
    for (let i = 0; i < this.totalPoints; i++) {
      const point = new PeptidePoint(
        this.index + 1,
        this.pointGap * i,
        this.centerY
      );
      this.points[i] = point;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY);

    for (let i = 1; i < this.totalPoints; i++) {
      if (i < this.totalPoints - 1) {
        // this.points[i].update();
      }

      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }
    ctx.moveTo(prevX, prevY);
    // ctx.lineTo(this.stageWidth, this.stageHeight);
    // ctx.lineTo(this.points[0].x, this.stageWidth);
    ctx.stroke();
    ctx.lineWidth = 3;
    ctx.lineCap = "square";
    // ctx.closePath();
    // this.point.update();

    // ctx.arc(this.point.x, this.point.y, 100, 0, 2 * Math.PI);
    // ctx.fill();
  }
}
