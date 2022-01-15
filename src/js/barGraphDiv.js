const container = document.getElementById("barv2");

document.addEventListener("DOMContentLoaded", (event) => {
  for (var x = 0; x < 92, x++; ) {
    console.log(x);
    let obj = document.createElement("div").setAttribute("class", "line");
    container.appendChild(obj);
  }
});

// let errorTargets = gsap.utils.toArray(".errorTarget");

// errorTargets.forEach(target => {
//   let errorClicker = document.createElement("")
// })
