window.addEventListener("DOMContentLoaded", (event) => {
  var circle = document.getElementById("errorOne");
  console.log(circle);
});

function getScreenCoords(x, y, ctm) {
  var xn = ctm.e + x * ctm.a + y * ctm.c;
  var yn = ctm.f + x * ctm.b + y * ctm.d;
  return { x: xn, y: yn };
}

var cx = +circle.getAttribute("cx");
var cy = +circle.getAttribute("cy");
var ctm = circle.getCTM();
var coords = getScreenCoords(cx, cy, ctm);
console.log(coords.x, coords.y); // shows coords relative to my svg container
