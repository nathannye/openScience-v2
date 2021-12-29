import gsap from "gsap";
import SplitText from "gsap/SplitText";
import scrollTrigger from "gsap/ScrollTrigger";
import Draggable from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";
import { random } from "gsap/gsap-core";
import { create } from "combined-stream";
// import { GLTFLoader } from "three/examples/js/loaders/GLTFLoader";

gsap.registerPlugin(scrollTrigger);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(Draggable);

const teal = "#13f1df";
const ylw = "#ebd664";
const blue = "#001f4e";
const white = "white";
let introPara = document.querySelector("#introPanel p");

introPara.split = new SplitText(introPara, {
  type: "lines, chars",
});

// Audio Control
let soundOn = document.querySelector("#yesSoundContainer > button");
let soundOff = document.querySelector("#noSoundContainer > button");
let soundtrack = document.querySelector("audio");

soundtrack.currentTime = 0;

soundOn.addEventListener("click", (event) => {
  soundtrack.play();
});

let soundButtons = gsap.utils.toArray("#soundButtons button");
let body = document.querySelector("body");

let titles = document.querySelectorAll("#introHeadingContainer h1");

let introPanel = document.querySelector("#introPanel");

let openSource = titles[0];
let openScience = titles[1];

let nglStage = document.querySelector("#viewport");
let grain = document.querySelector("#grain");

gsap.set(grain, {
  opacity: 0,
});

gsap.set(nglStage, {
  opacity: 0,
});

gsap.set(body, {
  overflow: "hidden",
});

openSource.split = new SplitText(openSource, {
  type: "chars",
});
openScience.split = new SplitText(openScience, {
  type: "chars",
});

const titleTL = gsap.timeline({
  onComplete: function () {
    gsap.to(body, {
      overflowY: "scroll",
    });
    createIntroOutTL();
  },
});

gsap.set(openSource.split.chars, {
  opacity: 0,
  y: 40,
  color: teal,
});
gsap.set(openScience.split.chars, {
  opacity: 0,
  y: -45,
  color: teal,
});

titleTL
  .to(introPanel, {
    autoAlpha: 1,
    duration: 0.01,
  })
  .to(
    openSource.split.chars,
    {
      y: 0,
      opacity: 1,
      color: white,
      stagger: {
        each: 0.02,
        ease: "power2.inOut",
        from: "start",
      },
      duration: 1.3,
      ease: "power4.inOut",
    },
    "start"
  )
  .to(
    openScience.split.chars,
    {
      y: 0,
      opacity: 1,
      color: ylw,
      stagger: {
        each: 0.02,
        ease: "power2.inOut",
        from: "start",
      },
      duration: 1.3,
      ease: "power4.inOut",
    },
    "start+=.167"
  )
  .to(
    grain,
    {
      opacity: 1,
      duration: 1.2,
    },
    "stageIn"
  )
  .to(
    nglStage,
    {
      opacity: 1,
      duration: 3,
    },
    "start+=18%",
    "stageIn"
  )
  .from(
    introPara.split.lines,
    {
      autoAlpha: 0,
      y: 20,
      rotationY: -20,
      color: ylw,
      ease: "power2.out",
      stagger: 0.09,
      duration: 1.25,
    },
    "start+=.3"
  );

// let audioAskTL = gsap.timeline({
//   paused: true,
//   onComplete: function () {
//     // titleTL.play();
//     audioAskTL.kill();
//   },
// });
// audioAskTL = null;

// audioAskTL
//   .to(
//     soundAskHeader,
//     {
//       duration: 1.28,
//       autoAlpha: 0,
//       z: 30,
//       ease: "power4.inOut",
//       filter: "blur(4px)",
//     },
//     "start"
//   )
//   .to(
//     soundButtons,
//     {
//       z: 40,
//       autoAlpha: 0,
//       ease: "power4.inOut",
//       filter: "blur(2px)",
//       stagger: 0.05,
//       delay: 0.148,
//     },
//     "start"
//   )
//   .to(soundAsk, {
//     autoAlpha: 0,
//     duration: 0.7,
//     ease: "power2.inOut",
//   });
// .to(soundAsk, {
//   display: none,
// });

soundButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    audioAskTL.play();
  });
});

// Image section

function createIntroOutTL() {
  let introOutTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#introPanel",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      pin: true,
      paused: true,
      onComplete: function () {
        createFirstInterstitial();
      },
    },
  });
  introOutTL
    .to(
      openSource.split.chars,
      {
        z: 22,
        y: -13,
        autoAlpha: 0,
        filter: "blur(3px)",
        rotateY: -4,
        duration: 1.8,
        ease: "power3.inOut",
        stagger: {
          each: 0.07,
          ease: "power2.inOut",
          from: "edges",
        },
      },
      "scrollingOut"
    )
    .to(
      openScience.split.chars,
      {
        z: -22,
        y: 24,
        autoAlpha: 0,
        ease: "power3.inOut",
        filter: "blur(6.6px)",
        rotateY: 5,
        stagger: {
          each: 0.07,
          ease: "power3.inOut",
          from: "edges",
        },
        duration: 1.8,
      },
      "scrollingOut"
    )
    .to(
      introPara.split.lines,
      {
        z: -2,
        y: 9,
        opacity: 0,
        color: teal,
        rotateX: -9,
        ease: "power2.out",
        duration: 0.7,
        filter: "blur(1px)",
        stagger: {
          each: 0.04,
          ease: "power1.inOut",
          from: "random",
        },
      },
      "scrollingOut+=98%"
    );
}

// let h4 = gsap.utils.toArray("section.interstitial h4");
let h4 = document.querySelector("#whatDoProteins h4");

let interstitialOne = document.querySelector("#whatDoProteins");

h4.split = new SplitText(h4, {
  type: "words",
});

let firstInterstitial = gsap.timeline({
  scrollTrigger: {
    start: "top top",
    end: "bottom top",
    trigger: interstitialOne,
    pin: true,
    pinSpacing: true,
    scrub: 0.3,
  },
});

firstInterstitial.from(h4.split.words, {
  duration: 1.5,
  z: -33,
  autoAlpha: 0,
  ease: "power4.out",
  stagger: {
    from: "edges",
    each: 0.052,
  },
});
firstInterstitial.to(h4.split.words, {
  duration: 1.5,
  z: -33,
  autoAlpha: 0,
  stagger: {
    from: "edges",
    each: 0.052,
  },
});

let h2 = document.querySelectorAll("h2.fromFarAndAway");
function setupFarAndAway() {
  h2.forEach((e) => {
    if (e.anim) {
      e.anim.progress(1).kill();
      e.split.revert();
    }
    e.split = new SplitText(e, {
      type: "chars, lines",
      linesClass: "splitLine",
    });
    e.anim = gsap.from(e.split.chars, {
      scrollTrigger: {
        trigger: e,
        start: "top bottom-=24%",
        markers: true,
        toggleActions: "restart none none reverse",
      },
      yPercent: 100,
      color: teal,
      duration: 0.65,
      ease: "power34.inOut",
      stagger: {
        each: 0.005,
        ease: "power2.inOut",
      },
    });
  });
}

scrollTrigger.addEventListener("refresh", setupFarAndAway);
setupFarAndAway();

document.addEventListener("DOMContentLoaded", (event) => {
  let images = gsap.utils.toArray(".parallaxImage");

  gsap.set(images, {
    "clip-path": "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    yPercent: -20,
  });

  gsap.to(images, {
    "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    yPercent: 0,
    scrollTrigger: {
      trigger: "#numberOfUsersPanel",
      start: "top bottom-=17%",
      markers: true,
    },
    stagger: {
      each: 0.04,
      from: "random",
    },
    duration: 0.76,
    ease: "power3.inOut",
  });
});

// gsap.from(images[0], {
//   scrollTrigger: {
//     scrub: true,
//     start: "top bottom",
//     end: "bottom top",
//     trigger: "#numberOfUsersPanel",
//   },
//   yPercent: -60,
// });

// gsap.from(images[1], {
//   scrollTrigger: {
//     scrub: true,
//     start: "top bottom",
//     end: "bottom top",
//     trigger: "#numberOfUsersPanel",
//   },
//   yPercent: -22,
// });

// gsap.to(images[2], {
//   scrollTrigger: {
//     scrub: true,
//     start: "top bottom",
//     end: "bottom top",
//     trigger: "#numberOfUsersPanel",
//   },
//   yPercent: -19,
// });

// gsap.from(images[3], {
//   scrollTrigger: {
//     scrub: true,
//     start: "top bottom",
//     end: "bottom top",
//     trigger: "#numberOfUsersPanel",
//   },
//   yPercent: 87,
// });

let container = document.querySelector("#unfoldedContainer > div");

Draggable.create(container, {
  bounds: "#unfoldedContainer",
  inertia: true,
  type: "y",
  cursor: "drag",
});

// Paragraphs anim

let paras = gsap.utils.toArray("p:not(#introPanel p)");

function setupParas() {
  paras.forEach((para) => {
    para.split = new SplitText(para, {
      type: "lines",
    });
  });
}

document.addEventListener("refresh", setupParas);
setupParas();
