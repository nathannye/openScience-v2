import gsap from "gsap";

export class Point {
  constructor(index, x, y) {
    this.x = x;
    this.amplitude = 3;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.065;
    this.cur = index;
    this.max = Math.random() * 0 + this.amplitude;
  }

  update() {
    this.cur += this.speed;
    this.y = this.fixedY + Math.sin(this.cur) * this.max;
  }
}
