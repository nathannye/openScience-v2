import gsap from "gsap/all";
import SplitText from "gsap/SplitText";
import supercomputers from "./supercomputersData";

const table = document.getElementById("supercomputerTable");

supercomputers.forEach((computer) => {
  let tableRow = document.createElement("tr");

  let dataName = document.createElement("td");
  dataName.innerHTML = computer.name;
  dataName.classList.add("computerName");
  tableRow.appendChild(dataName);

  let dataOps = document.createElement("td");

  let dataOpsTextContainer = document.createElement("span");
  dataOpsTextContainer.classList.add("opsText");
  dataOpsTextContainer.innerHTML = computer.flops;
  dataOps.appendChild(dataOpsTextContainer);

  tableRow.appendChild(dataOps);

  let dataBar = document.createElement("span");
  dataBar.classList.add("dataBar");
  dataBar.style.width = (computer.flops / 1100) * 100 + "%";

  dataOps.appendChild(dataBar);

  table.appendChild(tableRow);
});

let dataBars = gsap.utils.toArray(".dataBar");
let operationsText = gsap.utils.toArray("opsText");
let rows = gsap.utils.toArray("#superComputerTable > tr");
let labels = gsap.utils.toArray("#supercomputerTable > tbody > tr > th");

operationsText.forEach((e) => {
  e.split = new SplitText(e, {
    type: "lines, words",
    linesClass: "splitLine",
  });

  gsap.set(e.split.words, {
    // yPercent: 0,
    autoAlpha: 0,
  });

  e.tl = gsap.timeline({
    paused: true,
  });

  e.tl.to(e.split.words, {
    yPercent: 100,
  });
});

let tabletl = gsap.timeline({
  paused: true,
});

tabletl
  .from(labels, {
    autoAlpha: 0,
    duration: 0.35,
    stagger: 0.04,
  })
  .from(
    rows,
    {
      duration: 0.74,
      y: 20,
      autoAlpha: 0,
      ease: "power3.inOut",
      stagger: 0.03,
    },
    "rows"
  )
  .call(function () {
    for (let i = 0; i < operationsText.length; i++) {
      setInterval(() => {
        operationsText[i].tl.play();
      }, 300);
    }
  }, "rows");

export default tabletl;
