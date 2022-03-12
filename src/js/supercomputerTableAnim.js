import gsap from "gsap/all";
import SplitText from "gsap/SplitText";
import supercomputers from "./supercomputersData";
import ScrollTrigger from "gsap/ScrollTrigger";
import data from "./data";

gsap.registerPlugin(SplitText, ScrollTrigger);

const table = document.getElementById("supercomputerTable");
const hoverContainer = document.getElementById("supercomputerHoverContainer");

document.addEventListener("mousemove", (e) => {
  var left = e.pageX;
  var top = e.pageY;
  hoverContainer.style.left = left + "px";
  hoverContainer.style.top = top + "px";
});

supercomputers.forEach((computer) => {
  let tableRow = document.createElement("tr");
  let image = document.createElement("img");
  image.src = `./src/img/supercomputers/${computer.img}.jpg`;

  let dataName = document.createElement("td");
  dataName.innerHTML = computer.name;
  dataName.classList.add("computerName");

  gsap.set(image, {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    filter: "saturate(0)",
    scale: 1.03,
    autoAlpha: 0,
    y: 90,
  });

  let tl = gsap.timeline({
    paused: true,
  });

  tl.to(image, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    filter: "saturate(1)",
    autoAlpha: 1,
    y: 0,
    duration: 0.44,
    ease: "power2.inOut",
  });

  dataName.addEventListener("mouseover", (event) => {
    tl.play();
  });

  dataName.addEventListener("mouseleave", (event) => {
    tl.reverse();
  });

  hoverContainer.appendChild(image);

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

function tableAnim() {
  let dataBars = gsap.utils.toArray(".dataBar");
  let operationsText = gsap.utils.toArray(".opsText");
  let name = gsap.utils.toArray(".computerName");
  let rows = gsap.utils.toArray("#supercomputerTable tr");
  let labels = gsap.utils.toArray("#supercomputerTable > tbody > tr > th");

  gsap.set(dataBars, {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
  });

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: table,
      start: "top center",
      markers: true,
    },
  });
  tl.from(
    rows,
    {
      y: 20,
      stagger: 0.2,
      scale: 0.94,
      duration: 0.95,
      autoAlpha: 0,
    },
    0
  ).to(
    dataBars,
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.45,
      delay: 0.21,
      ease: "power3.inOut",
      stagger: 0.2,
    },
    0
  );
}

tableAnim();
