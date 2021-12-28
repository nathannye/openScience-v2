import { tickStep } from "d3";

export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.04;
    this.cur = 0;
    this.max = Math.random() * 100 + 150;
  }
  update() {
    this.cur += this.speed;
    this.y = this.fixedY + Math.sin(this.cur) * this.max;
  }
}
