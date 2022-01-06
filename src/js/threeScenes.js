import * as THREE from "three";

const sizes = {
  width: window.innerHeight,
  height: window.innerHeight,
};

// Object

let axesHelper = new THREE.AxesHelper(40);

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

scene.add(axesHelper);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  800
);
camera.position.z = 3;
camera.lookAt(0, 0, 0);
scene.add(camera);
// scene.add(mesh);

let container = document.getElementById("peptideAnimationContainer");

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
canvas.appendChild(renderer.domElement);

const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();
