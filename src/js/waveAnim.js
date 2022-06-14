class Point {
  constructor(index, x, y) {
    this.x = x;
    //Amplitude I want to animate
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
class Wave {
  constructor(index, totalPoints, color) {
    this.index = index;
    this.totalPoints = totalPoints;
    this.color = color;
    this.points = [];
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = stageWidth / 8;
    this.centerY = stageHeight / 4;

    this.pointGap = this.stageWidth / (this.totalPoints - 1);

    this.init();
  }

  init() {
    this.points = [];
    for (let i = 0; i < this.totalPoints; i++) {
      const point = new Point(this.index + i, this.pointGap * i, this.centerY);
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
        this.points[i].update();
      }

      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }
    ctx.moveTo(prevX, prevY);
    ctx.stroke();
    ctx.lineWidth = 0.7;
    ctx.lineCap = "square";
  }
}
class WaveGroup {
  constructor() {
    this.totalWaves = 1;
    // Animate # of points for a saw?
    this.totalPoints = 17;

    this.color = ["#FFE65C"];

    this.waves = [];

    for (let i = 0; i < this.totalWaves; i++) {
      const wave = new Wave(i, this.totalPoints, this.color[i]);
      this.waves[i] = wave;
    }
  }

  resize(stageWidth, stageHeight) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.resize(stageWidth, stageHeight);
    }
  }
  draw(ctx) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.draw(ctx);
    }
  }
}

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
