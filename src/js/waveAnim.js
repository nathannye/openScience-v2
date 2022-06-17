// import * as dat from "dat.gui";
import gsap from "gsap";

const container = document.getElementById("soundIndicatorContainer");
const canvas = document.createElement("canvas");
canvas.setAttribute("id", "soundIndicator");
container.appendChild(canvas);

const ctx = canvas.getContext("2d");
canvas.width = 35 * 4;
canvas.height = 20 * 4;
ctx.scale(4, 4);

ctx.strokeWidth = 30;
ctx.strokeStyle = "#FFE65C";

export const wave = {
  amplitude: 0,
  wavelength: 0.33,
  frequency: 0.26,
  increment: 0.05,
};

const animate = () => {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  // Move from top left to middle left
  ctx.moveTo(0, canvas.height / 8);

  for (let i = 0; i < canvas.width * 4; i++) {
    ctx.lineTo(
      i,
      canvas.height / 8 +
        Math.sin(i * wave.wavelength + wave.increment) * wave.amplitude
    );
  }
  ctx.stroke();
  wave.increment += wave.frequency;
};

animate();
