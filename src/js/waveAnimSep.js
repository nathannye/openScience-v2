// import * as dat from "dat.gui";
import gsap from "gsap";

const container = document.getElementById("soundIndicatorContainer");
const canvas = document.createElement("canvas");
canvas.setAttribute("id", "soundIndicator");
container.appendChild(canvas);

const ctx = canvas.getContext("2d");
canvas.width = 35;
canvas.height = 20;

ctx.strokeWidth = 30;
ctx.strokeStyle = "#FFE65C";

let wave = {
  amplitude: 5,
  wavelength: 0.33,
  frequency: 0.05,
  increment: 0.05,
};

gsap.to(wave, {
  amplitude: 1,
  duration: 5,
  yoyo: true,
  repeat: -1,
});

const animate = () => {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();

  // Move from top left to middle left
  ctx.moveTo(0, canvas.height / 2);

  for (let i = 0; i < canvas.width * 9; i++) {
    ctx.lineTo(
      i,
      canvas.height / 2 +
        Math.sin(i * wave.wavelength + wave.increment) * wave.amplitude
    );
  }
  ctx.stroke();
  wave.increment += wave.frequency;
  console.log(wave.amplitude);
};

animate();
