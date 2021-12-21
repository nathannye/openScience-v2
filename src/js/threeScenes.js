import * as THREE from "three";
import { PDBLoader } from "three/examples/jsm/loaders/PDBLoader.js";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const canvas = document.querySelector("canvas.webgl");
// Object

let axesHelper = new THREE.AxesHelper();

const loader = new PDBLoader();
const offset = new THREE.Vector3();

loader.load("models/5r7y.pdb", function (pdb) {
  const geometryAtoms = pdb.geometryAtoms;
  const geometryBonds = pdb.geometryBonds;
  const json = pdb.json;

  const boxGeo = new THREE.BoxGeometry(2, 2, 2);
  const sphereGeo = new THREE.IcosahedronGeometry();

  geometryAtoms.computeBoundingBox();
  geometryAtoms.boundingBox.getCenter(offset).negate;

  geometryAtoms.translate(offset.x, offset.y, offset.z);
  geometryBonds.translate(offset.x, offset.y, offset.z);

  let positions = geometryAtoms.getAttribute("position");
  const colors = geometryAtoms.getAttribute("color");

  const position = new THREE.Vector3();
  const color = new THREE.Color();

  for (let i = 0; i < positions.count; i++) {
    position.x = positions.getX(i);
    position.y = positions.getY(i);
    position.z = positions.getZ(i);

    color.r = colors.getX(i);
    color.g = colors.getY(i);
    color.b = colors.getZ(i);

    const material = new THREE.MeshPhongMaterial({ color: color });

    const object = new THREE.Mesh(sphereGeometry, material);
    object.position.copy(position);
    object.position.multiplyScalar(75);
    object.scale.multiplyScalar(25);
    root.add(object);

    const atom = json.atoms[i];
    positions = geometryBonds.getAttribute("position");

    const start = new THREE.Vector3();
    const end = new THREE.Vector3();

    for (let i = 0; i < positions.count; i += 2) {
      start.x = positions.getX(i);
      start.y = positions.getY(i);
      start.z = positions.getZ(i);

      end.x = positions.getX(i + 1);
      end.y = positions.getY(i + 1);
      end.z = positions.getZ(i + 1);

      start.multiplyScalar(75);
      end.multiplyScalar(75);

      const object = new THREE.Mesh(
        boxGeometry,
        new THREE.MeshPhongMaterial(0xffffff)
      );
      object.position.copy(start);
      object.position.lerp(end, 0.5);
      object.scale.set(5, 5, start.distanceTo(end));
      object.lookAt(end);
      root.add(object);

      console.log(object);
    }
  }
});

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
// renderer.setClearColor(0x1ff);

const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();
