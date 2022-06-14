var amplitude = 7;
var speed = 0.065;
var max = Math.random() * 0 + amplitude;
var cur = 0;
var y = 0;
var x = 0;
var fixedY = y;
const totalPoints = 17;
var totalWaves = 1;
const stageWidth = 35;
const stageHeight = 20;
const centerX = stageWidth / 8;
const centerY = stageHeight / 4;
const container = document.getElementById("soundIndicatorContainer");
const canvas = document.createElement("canvas");
canvas.setAttribute("id", "soundIndicator");
const ctx = canvas.getContext("2d");

const resize = () => {
  stageWidth = document.body.clientWidth;
  stageHeight = document.body.clientHeight;
  canvas.height = stageHeight;
  canvas.width = stageWidth;
  ctx.scale(2, 2);
};

function createWave() {
  window.addEventListener("resize", resize, false);

    for (let i = 0; i < totalWaves; i++) {
      
  }
}

const update = () => {
  cur += speed;
  y = fixedY + Math.sin(cur) * max;
};
