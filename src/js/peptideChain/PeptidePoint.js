export default class PeptidePoint {
  constructor(index, x, y) {
    this.x = x;
    this.amplitude = 40;
    this.y = y;
    this.fixedX = x;
    this.cur = index;
    this.max = Math.random() * 0 + this.amplitude;
  }
  update() {
    this.x = this.fixedX + Math.sin(this.cur) * this.max;
  }
}
