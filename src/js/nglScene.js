import gsap from "gsap/all";

// Create NGL Stage object
var stage = new NGL.Stage("viewport", {});

const teal = "#13f1df";
const ylw = "#ebd664";
const blue = "#001f4e";
const red = "#e32121";
const white = "white";

stage.setParameters({
  // backgroundColor: "#030b18",
  fogFar: 35,
  antiAlias: true,
  fogNear: 9,
  clipFar: 32,
  lightIntensity: 1,
  ambientIntensity: 1.5,
  // lightColor: teal,
  // ambientColor: blue,
});
// stage.parameters.lightColor = red;

stage.parameters.lightColor = red;

// gsap.to(stage.setParameters);

// stage.lightColor = red;
// stage.ambientColor = red;
// Handle window resizing
window.addEventListener(
  "resize",
  function (event) {
    stage.handleResize();
  },
  false
);

// Load PDB entry 1CRN
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

// var cartoonStage = new NGL.Stage("cartoonStage");

// cartoonStage
//   .loadFile("rcsb://5R81.cif", {
//     assembly: "AU1",
//   })
//   .then((comp) => {
//     comp.addRepresentation("cartoon", {
//       colorScheme: "residueindex",
//     });
//     stage.autoView();
//   });
