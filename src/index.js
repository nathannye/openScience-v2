import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import Stage from "./components/Stage.js";
import Title from "./sections/Title.js";
import SupercomputerTable from "./sections/SupercomputerTable.js";
import Wave from "./animations/Wave.js";
import Faq from "./sections/Faq.js";
import WhyComputers from "./sections/WhyComputers.js";
import Nav from "./components/Nav.js";
import SoundToggle from "./components/SoundToggle.js";
import Draggable from "gsap/Draggable";
import CustomEase from "gsap/CustomEase";
import InertiaPlugin from "gsap/InertiaPlugin";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import WhatIsFolding from "./sections/WhatIsFolding.js";
import ReduceCosts from "./sections/ReduceCosts.js";
import Graph from "./sections/Graph.js";
import Interstitials from "./components/Interstitials.js";
import Preloader from "./components/Preloader.js";

class App {
  constructor() {
    this.registerPlugins();
    this.createNav();
    this.createSections();
    this.createPreloader();
    this.createInterstitials();
    this.createStage();
    this.overflowControl();
    this.refresh();
  }

  registerPlugins() {
    gsap.registerPlugin(
      ScrollTrigger,
      SplitText,
      Draggable,
      CustomEase,
      InertiaPlugin,
      DrawSVGPlugin
    );
  }
  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once("completed", this.playIntro.bind(this));
  }

  createStage() {
    this.stage = new Stage();
  }

  createNav() {
    this.nav = new Nav();
  }

  createInterstitials() {
    this.interstitial = new Interstitials();
  }

  overflowControl(state) {
    state
      ? (document.querySelector("html").style.overflowY = "auto")
      : (document.querySelector("html").style.overflowY = "hidden");

    // html.style.overflowY == "auto" || html.style.overflowY == ""
    //   ? (html.style.overflowY = "hidden")
    //   : (html.style.overflowY = "auto");

    // if (
    //   this.elements.html.style.overflowY == "auto" ||
    //   this.elements.html.style.overflowY == ""
    // ) {
    //   gsap.to(this.elements.html, {
    //     overflowY: "hidden",
    //   });
    // } else {
    //   gsap.to(this.elements.html, {
    //     overflowY: "auto",
    //   });
    // }
  }

  createSections() {
    this.sections = {
      title: new Title({ wave: this.wave }),
      what: new WhatIsFolding(),
      why: new WhyComputers(),
      graph: new Graph(),
      supercomputer: new SupercomputerTable(),
      cost: new ReduceCosts(),
      faq: new Faq(),
    };

    for (let section in this.sections) {
      this.section = this.sections[section];
    }
  }

  playIntro() {
    setTimeout(() => {
      this.sections.title.tl.play();
      this.preloader.destroy();
      setTimeout(() => {
        this.overflowControl();
      }, this.sections.title.tl.duration());
    }, 900);
  }

  refresh() {
    ScrollTrigger.refresh();
  }
}

new App();

let h4 = document.querySelector("#whatDoProteins h4");
h4.split = new SplitText(h4, {
  type: "words",
});

let h2 = document.querySelectorAll("h2.headAnim");
function setupFarAndAway() {
  h2.forEach((e) => {
    if (e.anim) {
      e.anim.progress(1).kill;
      e.anim.invalidate;
    }
    e.split = new SplitText(e, {
      type: "words, lines",
      linesClass: "splitLine",
    });
    e.anim = gsap.from(e.split.words, {
      scrollTrigger: {
        trigger: e,
        start: "top bottom-=24%",
      },
      onComplete: () => {
        e.split.revert();
      },
      yPercent: 100,
      autoAlpha: 0,
      duration: 1,
      ease: "power4.inOut",
      stagger: 0.0142,
    });
  });
}
setupFarAndAway();

// Paragraphs anim
let paras = gsap.utils.toArray("p.paraAnim");

function setupParas() {
  paras.forEach((para) => {
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split.revert();
      para.anim.invalidate();
    }
    para.split = new SplitText(para, {
      type: "lines",
    });
    para.anim = gsap.from(para.split.lines, {
      scrollTrigger: {
        start: "top bottom-=24%",
        trigger: para,
      },
      onComplete: () => {
        para.split.revert();
      },
      autoAlpha: 0,
      y: 15,
      rotateY: -8,
      ease: "power2.out",
      stagger: 0.09,
      duration: 0.9,
    });
  });
}

setupParas();

ScrollTrigger.addEventListener("refresh", function () {
  setupFarAndAway();
  setupParas();
});

// Link animations

// const links = gsap.utils.toArray("cite > a, a.externalLink");

let h3 = gsap.utils.toArray("h3:not(h3#dragDirections, .soundAsk h3)");

h3.forEach((e) => {
  document.fonts.ready.then(() => {
    e.split = new SplitText(e, {
      type: "lines, words",
      linesClass: "splitLine",
    });

    gsap.from(e.split.words, {
      scrollTrigger: {
        trigger: e,
        start: "top bottom-=14%",
      },
      yPercent: 100,
      duration: 0.65,
      ease: "power3.inOut",
      stagger: 0.03,
      onComplete: () => {
        e.split.revert();
      },
    });
  });
});

let helpImages = gsap.utils.toArray("#howCanYouHelp object, img");

helpImages.forEach((e) => {
  gsap.set(e, {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  });

  gsap.to(e, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1.25,
    ease: "power3.inOut",
    scrollTrigger: {
      start: "top bottom+=12%",
      trigger: e,
    },
  });
});
