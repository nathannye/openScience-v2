var stage = new NGL.Stage("viewport", {
  backgroundColor: "green",
});
stage.loadFile("../models/5r81.pdb", { defaultRepresentation: true });

window.addEventListener(
  "resize",
  function (event) {
    stage.handleResize();
  },
  false
);
