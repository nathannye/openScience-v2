import * as THREE from "three";
import gsap from "gsap";

import splitText from "gsap/SplitText";
import scrollTrigger from "gsap/ScrollTrigger";
import { random } from "gsap/gsap-core";
// import { GLTFLoader } from "three/examples/js/loaders/GLTFLoader";

gsap.registerPlugin(scrollTrigger);

scrollTrigger.defaults({
  start: "top bottom-=15%",
  end: "top top+=20%",
  toggleActions: "play reverse play reverse",
});

let h3 = gsap.utils.toArray("h3");

let h3Split = new splitText(h3, {
  type: "chars",
});

gsap.set(h3Split.chars, {
  autoAlpha: 0,
  // y: 20,
});

function sorth3() {
  h3Split.chars.sort(function () {
    return 0.5 - Math.random();
  });
}

function sorth3reverse() {
  h3Split.chars.sort(function () {
    return 0.5 + Math.random();
  });
}

h3.forEach((e) => {
  gsap.to(h3Split.chars, {
    y: 0,
    autoAlpha: 1,
    duration: 1.25,
    ease: "power4.in",
    stagger: 0.004,
    scrollTrigger: {
      trigger: e,
      onEnter: sorth3(),
      onLeave: sorth3reverse(),
      onEnterBack: sorth3(),
      onLeaveBack: sorth3reverse(),
    },
  });
});

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const canvas = document.querySelector("canvas.webgl");
// Object

// const loader = new GLTFLoader();

// loader.load("models/rona.gltf", function (gltf) {
//   scene.add(gltf.scene);
//   gltf.animations;
//   gltf.scene;
//   gltf.scene;
//   gltf.cameras;
//   gltf.asset;
// });

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

// setting indexes for sections
