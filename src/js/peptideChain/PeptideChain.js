import { PeptideLine } from "./PeptideLine";

export class PeptideChain {
  constructor() {
    this.totalLines = 1;
    // Animate # of points for a saw?
    this.totalPoints = 120;

    this.color = ["#FFE65C"];

    this.lines = [];

    for (let i = 0; i < this.totalLines; i++) {
      const line = new PeptideLine(i, this.totalPoints, this.color[i]);
      this.lines[i] = line;
    }
  }

  resize(stageWidth, stageHeight) {
    for (let i = 0; i < this.totalLines; i++) {
      const line = this.lines[i];
      line.resize(stageWidth, stageHeight);
    }
  }
  draw(ctx) {
    for (let i = 0; i < this.totalLines; i++) {
      const line = this.lines[i];
      line.draw(ctx);
    }
  }
}
