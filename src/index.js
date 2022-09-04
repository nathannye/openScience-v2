import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import Stage from "./components/Stage.js";
import Title from "./sections/Title.js";
import SupercomputerTable from "./sections/SupercomputerTable.js";
import Faq from "./sections/Faq.js";
import WhyComputers from "./sections/WhyComputers.js";
import Nav from "./components/Nav.js";
import SoundToggle from "./components/SoundToggle.js";
import Draggable from "gsap/Draggable";
import CustomEase from "gsap/CustomEase";
import InertiaPlugin from "gsap/InertiaPlugin";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

class App {
  constructor() {
    this.registerPlugins();
    this.createStage();
    this.createNav();
    this.createAudioController();
    this.createSections();
    this.playTitle();
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

  createPreloader() {}

  createIntro() {}

  createStage() {
    this.stage = new Stage();
  }

  createNav() {
    this.nav = new Nav();
  }

  createSections() {
    this.sections = {
      title: new Title(),
      supercomputer: new SupercomputerTable(),
      faq: new Faq(),
      why: new WhyComputers(),
    };

    for (let section in this.sections) {
      this.section = this.sections[section];
      this.section.create();
    }
  }

  createAudioController() {
    this.audio = new SoundToggle();
  }

  playTitle() {
    // this.title.tl.play();
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

// links.forEach((link) => {
//   let e = document.createElement("div");
//   let f = document.createElement("div");
//   e.className = "underline";
//   f.className = "underlineLeft";
//   link.appendChild(e);
//   link.appendChild(f);

//   e.tl = gsap.timeline({
//     paused: true,
//   });

//   e.tl
//     .to(
//       e,
//       {
//         xPercent: 100,
//         duration: 0.4,
//         ease: "power3.inOut",
//       },
//       "start"
//     )
//     .to(
//       f,
//       {
//         xPercent: 100,
//         duration: 0.4,
//         ease: "power3.inOut",
//       },
//       "start+=.085"
//     )
//     .to(
//       link,
//       {
//         color: colors.ylw,
//         duration: 0.45,
//       },
//       "start"
//     );

//   link.addEventListener("mouseover", (event) => {
//     e.tl.play();
//   });

//   link.addEventListener("mouseout", (event) => {
//     e.tl.reverse();
//   });
// });

let h3 = gsap.utils.toArray("h3:not(h3#dragDirections)");

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
