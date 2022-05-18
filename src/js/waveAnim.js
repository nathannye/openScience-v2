import { index } from "d3";
import gsap from "gsap";
import colors from "./colors";

const stage = {
  height: 20,
  width: 35,
};

const container = document.getElementById("soundIndicatorContainer");
const canvas = document.createElement("canvas");
canvas.setAttribute("id", "soundIndicator");
const ctx = canvas.getContext("2d");
container.appendChild(canvas);
canvas.height = stage.height;
canvas.width = stage.width;

c.beginPath();

c.moveTo(0, canvas.height / 2);

for (let i = 0; i < canvas.width; i++) {
  c.lineTo(i, i);
}

c.stroke();
c.lineWidth = 3;
c.strokeStyle = colors.ylw;
