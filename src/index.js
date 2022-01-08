import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import InertiaPlugin from "gsap/InertiaPlugin";
import { random } from "gsap/gsap-core";
import { stage } from "./js/nglScene";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const teal = "#13f1df";
const ylw = "#FFE65C";
const blue = "#001f4e";
const red = "#e32121";
const white = "white";
let introPara = document.querySelector("#introPanel p");

function setupIntroParaSplit() {
  introPara.split = new SplitText(introPara, {
    type: "lines, chars",
  });
}

ScrollTrigger.addEventListener("refresh", setupIntroParaSplit);
setupIntroParaSplit();

// Audio Control
let soundOn = document.querySelector("#yesSoundContainer > button");
let soundOff = document.querySelector("#noSoundContainer > button");
const soundtrack = document.querySelector("audio");

soundtrack.currentTime = 0;

soundOn.addEventListener("click", (event) => {
  soundtrack.play();
  var sound = true;
});

let soundButtons = gsap.utils.toArray("#soundButtons button");
let content = document.querySelector("main");

let titles = document.querySelectorAll("#introHeadingContainer h1");

let introPanel = document.querySelector("#introPanel");

let openSource = titles[0];
let openScience = titles[1];

let nglStage = document.querySelector("#viewport");
let grain = document.querySelector("#grain");
let html = document.querySelector("html");
let navMarkers = gsap.utils.toArray(".navMarker");

// gsap.to(nglStage, {
//   scrollTrigger: {
//     trigger: content,
//     scrub: 0.5,
//     start: "top top",
//     end: "bottom bottom",
//   },
//   yPercent: -3.5,
// });

gsap.set(grain, {
  opacity: 0,
});

gsap.set(nglStage, {
  opacity: 0,
});

openSource.split = new SplitText(openSource, {
  type: "chars",
});
openScience.split = new SplitText(openScience, {
  type: "chars",
});

gsap.set(html, {
  overflowY: "hidden",
});

const titleTL = gsap.timeline({
  onComplete: function () {
    createIntroOutTL();
    titleTL.invalidate();
    titleTL.kill();
  },
});

gsap.set(openSource.split.chars, {
  opacity: 0,
  yPercent: 30,
  color: teal,
});
gsap.set(openScience.split.chars, {
  opacity: 0,
  yPercent: -30,
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
      yPercent: 0,
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
      yPercent: 0,
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
  )
  .from(
    navMarkers,
    {
      stagger: ".1",
      scale: 0.64,
      duration: 0.66,
      autoAlpha: 0,
      ease: "back.out(1.3)",
    },
    "start+=.6"
  )
  .to(html, {
    overflowY: "auto",
  });

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
        trigger();
      },
    },
  });
  introOutTL
    .to(
      openSource.split.chars,
      {
        z: 22,
        yPercent: -10,
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
        yPercent: 14,
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
    start: "top centerq",
    end: "bottom top",
    trigger: interstitialOne,
    pin: interstitialOne,
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
        // markers: true,
        toggleActions: "restart none none reverse",
      },
      yPercent: 100,
      color: teal,
      duration: 1,
      ease: "power3.inOut",
      stagger: 0.0042,
    });
  });
}

ScrollTrigger.addEventListener("refresh", setupFarAndAway);
setupFarAndAway();

// document.addEventListener("DOMContentLoaded", (event) => {
//   let images = gsap.utils.toArray(".parallaxImage");

//   gsap.set(images, {
//     "clip-path": "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
//     yPercent: -20,
//   });

//   gsap.to(images, {
//     "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
//     yPercent: 0,
//     scrollTrigger: {
//       trigger: "#numberOfUsersPanel",
//       start: "top bottom-=17%",
//       markers: true,
//     },
//     stagger: {
//       each: 0.04,
//       from: "random",
//     },
//     duration: 0.76,
//     ease: "power3.inOut",
//   });
// });

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

// Paragraphs anim
let paras = gsap.utils.toArray("p:not(#introPanel p)");

// function setupParas() {
//   paras.forEach((para) => {
//     para.split = new SplitText(para, {
//       type: "lines",
//     });
//   });
// }

// document.addEventListener("refresh", setupParas);
// setupParas();

// Nav Markers Animations

let navEntry = gsap.utils.toArray("nav > div > a");
let navDots = gsap.utils.toArray(".navMarker");
let sections = gsap.utils.toArray("section.contentPanel");

document.addEventListener("DOMContentLoaded", (event) => {
  for (let i = 0; i < sections.length; i++) {
    let tl = gsap.timeline({
      scrollTrigger: {
        start: "top bottom-=4%",
        end: "bottom bottom-=12%",
        markers: true,
        trigger: sections[i],
        onEnter: () => {
          navDots[i].classList.add("activeNav");
        },
        onLeave: () => {
          navDots[i].classList.remove("activeNav");
        },
        onEnterBack: () => {
          navDots[i].classList.add("activeNav");
        },
        onLeaveBack: () => {
          navDots[i].classList.remove("activeNav");
        },
      },
    });
  }
});

navEntry.forEach((entry) => {
  let entryTL = gsap.timeline({
    paused: true,
  });

  let entryLabel = entry.querySelector("p");
  entryLabel.split = new SplitText(entryLabel, {
    type: "chars, lines",
  });

  entryTL
    .to(
      entry.querySelector(".navMarker"),
      {
        x: "-.5rem",
        duration: 0.29,
        ease: "power3.inOut",
      },
      "hover"
    )
    .from(
      entryLabel.split.lines,
      {
        autoAlpha: 0,
        x: "-.5rem",
        ease: "power2.inOut",
        duration: 0.33,
        stagger: {
          each: ".04",
          from: "end",
        },
      },
      "hover"
    );

  entry.addEventListener("mouseover", (event) => {
    entryTL.play();
  });
  entry.addEventListener("mouseout", (event) => {
    entryTL.reverse();
  });
});

// Sound Indicator Animations + Toggle

// Image section

let images = gsap.utils.toArray("img.parallaxImage");
let imgTrigger = document.querySelector("#numberOfUsersPanel");

gsap.set(images, {
  clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
  yPercent: 11,
});

gsap.to(images, {
  scrollTrigger: {
    start: "top top",
    trigger: imgTrigger,
  },
  duration: 1.1,
  yPercent: 0,
  ease: "power3.inOut",
  clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
  stagger: 0.17,
});

document.addEventListener("DOMContentLoaded", (event) => {
  let dangerArea = document.getElementById("whyDoesFoldingMatter");
  let danger = gsap.utils.toArray(".dangerCloud");

  console.log(dangerArea);

  let wdfmTL = gsap.timeline({
    paused: true,
    scrollTrigger: {
      start: "top center",
      trigger: dangerArea,
      markers: true,
      onEnter: () => {
        wdfmTL.play();
      },
      onLeave: () => {
        wdfmTL.reverse();
      },
      onEnterBack: () => {
        wdfmTL.reverse();
      },
      onLeaveBack: () => {
        wdfmTL.play();
      },
    },
  });

  wdfmTL
    .to(html, {
      background: "#e32121",
      duration: 2,
    })
    .to(nglStage, {
      filter: "blur(13px)",
      duration: 4.5,
      ease: "power2.i nOut",
    })
    .from(danger, {
      autoAlpha: 0,
      duration: 2,
    });
});
