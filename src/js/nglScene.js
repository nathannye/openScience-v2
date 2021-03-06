import gsap from "gsap/all";
import colors from "./colors";
// import NGL from "ngl/dist/ngl";
import ScrollTrigger from "gsap/ScrollTrigger";
// Create NGL Stage object

gsap.registerPlugin(ScrollTrigger);

var stage = new NGL.Stage("viewport");

stage.setParameters({
  backgroundColor: "#030b18",
  fogFar: 35,
  antiAlias: true,
  fogNear: 9,
  clipFar: 32,
  lightIntensity: 1,
  ambientIntensity: 1.5,
  lightColor: colors.teal,
  ambientColor: colors.blue,
});

// Handle window resizing
window.addEventListener(
  "resize",
  function (event) {
    stage.handleResize();
  },
  false
);

// Load PDB entry
stage
  .loadFile("rcsb://5R81.cif", {
    assembly: "AU1",
  })
  .then((comp) => {
    comp.addRepresentation("cartoon", {
      colorScheme: "residueindex",
    });
    stage.autoView();
  });
