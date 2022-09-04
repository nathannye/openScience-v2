import gsap from "gsap";
import Component from "../classes/Component";
import supercomputers from "../js/supercomputersData";
import ScrollTrigger from "gsap/ScrollTrigger";

export default class SupercomputerTable extends Component {
  constructor() {
    super({
      element: "#supercomputerTable",
      elements: {
        hoverContainer: "#supercomputerHoverContainer",
      },
    });
    this.tl = gsap.timeline();
    super.create();
    this.createSupercomputerTable();
    this.createTableAnimations();
  }

  create() {
    super.create();
  }

  createSupercomputerTable() {
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
        duration: 0.56,
        ease: "power2.inOut",
      });

      dataName.addEventListener("mouseover", (event) => {
        tl.play();
      });

      dataName.addEventListener("mouseleave", (event) => {
        tl.reverse();
      });

      this.elements.hoverContainer.appendChild(image);

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

      this.element.appendChild(tableRow);
    });
  }

  createTableAnimations() {
    let dataBars = gsap.utils.toArray(".dataBar");
    let operationsText = gsap.utils.toArray(".opsText");
    let name = gsap.utils.toArray(".computerName");
    let rows = gsap.utils.toArray("#supercomputerTable tr");
    let labels = gsap.utils.toArray("#supercomputerTable > tbody > tr > th");

    gsap.set(dataBars, {
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    });

    ScrollTrigger.matchMedia({
      // trigger when 768 or higher
      "(min-width: 768px)": () => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: this.element,
            start: "top bottom-=10%",
            scrub: 0.25,
          },
        });
        tl.from(
          rows,
          {
            y: 20,
            stagger: 0.08,
            rotateY: -2,
            // scale: 0.955,
            transformOrigin: "left center",
            ease: "power3.out",
            duration: 0.72,
            autoAlpha: 0,
          },
          0
        ).to(
          dataBars,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.45,
            delay: 0.1,
            ease: "power3.inOut",
            stagger: 0.08,
          },
          0
        );
        return () => {
          tl.kill();
        };
      },
      // trigger 767 and lower
      "(max-width: 767px)": () => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: this.element,
            start: "top bottom-=10%",
            scrub: 0.25,
          },
        });
        tl.from(
          rows,
          {
            y: 20,
            stagger: 0.08,
            rotateY: -12,
            // scale: 0.955,
            transformOrigin: "left center",
            ease: "power3.out",
            duration: 0.72,
            autoAlpha: 0,
          },
          0
        ).to(
          dataBars,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.45,
            delay: 0.1,
            ease: "power3.inOut",
            stagger: 0.08,
          },
          0
        );
        return () => {
          tl.kill();
        };
      },
    });
  }
}
