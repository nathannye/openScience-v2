import * as THREE from "three";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const canvas = document.querySelector("canvas.webgl");
// Object

// Scene
const scene = new THREE.Scene();
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  800
);
camera.position.z = 3;
scene.add(camera);
// scene.add(mesh);

window.addEventListener("mousemove", cursor);

function cursor(event) {
  var posX = event.clientX;
  var posY = event.clientY;
}

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x00112a);

const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();
