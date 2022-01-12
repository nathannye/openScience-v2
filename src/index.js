import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import InertiaPlugin from "gsap/InertiaPlugin";
import { random } from "gsap/gsap-core";
// import GSDevTools from "./js/GSDevTools.min.js";
import lottie from "lottie-web";

// gsap.registerPlugin(GSDevTools);
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

// soundtrack.currentTime = 0;

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

gsap.to(nglStage, {
  scrollTrigger: {
    trigger: content,
    scrub: 2,
    rotateZ: 40,
    start: "top top",
    end: "bottom bottom",
  },
  yPercent: -3.4,
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
    titleTL.invalidate(true);
    titleTL.kill(true);
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
  .fromTo(
    nglStage,
    { filter: "saturate(0)", autoAlpha: 0, filter: "blur(13px)" },
    {
      filter: "saturate(1)",
      filter: "blur(1px)",
      duration: 3,
      autoAlpha: 1,
      ease: "power2.out",
    },
    "start",
    "stageIn"
  )
  .from(
    grain,
    {
      opacity: 0,
      duration: 1.2,
    },
    "stageIn"
  )
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
    "start+=1",
    "text"
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
    "start+=1.35"
  )
  .from(
    introPara.split.lines,
    {
      autoAlpha: 0,
      y: 20,
      rotateY: -20,
      color: ylw,
      ease: "power2.out",
      stagger: 0.09,
      duration: 1.15,
    },
    "start+=1.5"
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
  .call(createIntroOutTL, ["start+=.65"])
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
      pin: "#introPanel",
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
        rotateY: 3,
        ease: "power2.inOut",
        duration: 0.7,
        filter: "blur(4px)",
        stagger: 0.14,
      },
      "scrollingOut+=50%"
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
    start: "top center",
    end: "bottom top",
    trigger: interstitialOne,
    pin: interstitialOne,
    toggleActions: "restart reset restart restart",
  },
});

firstInterstitial
  .from(h4.split.words, {
    duration: 1.5,
    z: -33,
    autoAlpha: 0,
    ease: "power4.out",
    stagger: {
      from: "edges",
      each: 0.052,
    },
  })
  .to(h4.split.words, {
    autoAlpha: 0,
    delay: 2,
    z: -40,
    duration: 1,
    stagger: 0.052,
    filter: "blur(4px)",
  });

let h2 = document.querySelectorAll("h2.fromFarAndAway");
function setupFarAndAway() {
  h2.forEach((e) => {
    if (e.anim) {
      e.anim.progress(1).kill();
      e.split.revert();
    }
    e.split = new SplitText(e, {
      type: "words, lines",
      linesClass: "splitLine",
    });
    e.anim = gsap.from(e.split.words, {
      scrollTrigger: {
        trigger: e,
        start: "top bottom-=44%",
        toggleActions: "restart play play restart",
      },
      yPercent: 100,
      autoAlpha: 0,
      duration: 1.3,
      ease: "power4.inOut",
      stagger: 0.0242,
    });
  });
}

ScrollTrigger.addEventListener("refresh", setupFarAndAway);
setupFarAndAway();

// Paragraphs anim
let paras = gsap.utils.toArray("p.paraAnim");

function setupParas() {
  paras.forEach(para);
}

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
  // yPercent: 11,
});

gsap.to(images, {
  scrollTrigger: {
    start: "top top",
    trigger: imgTrigger,
  },
  duration: 1.1,
  // yPercent: 0,
  ease: "power3.inOut",
  clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
  stagger: 0.17,
  onComplete: createImageParallax,
});

function createImageParallax() {
  gsap.to(images[0], {
    scrollTrigger: {
      scrub: true,
      start: "top bottom",
      end: "bottom top",
      trigger: "#numberOfUsersPanel",
    },
    yPercent: -60,
  });
  gsap.to(images[1], {
    scrollTrigger: {
      scrub: true,
      start: "top bottom",
      end: "bottom top",
      trigger: "#numberOfUsersPanel",
    },
    yPercent: -22,
  });
  gsap.to(images[2], {
    scrollTrigger: {
      scrub: true,
      start: "top bottom",
      end: "bottom top",
      trigger: "#numberOfUsersPanel",
    },
    yPercent: -19,
  });
  gsap.to(images[3], {
    scrollTrigger: {
      scrub: true,
      start: "top bottom",
      end: "bottom top",
      trigger: "#numberOfUsersPanel",
    },
    yPercent: 87,
  });
}

let dangerArea = document.getElementById("whyDoesFoldingMatter");

// let wdfmTL = gsap.timeline({
//   paused: true,
//   scrollTrigger: {
//     start: "top center",
//     trigger: dangerArea,
//     toggleActions: "restart reset restart restart",
//   },
// });

// wdfmTL
//   .to(html, {
//     background: "#e32121",
//     duration: 2,
//   })
//   .to(nglStage, {
//     filter: "blur(13px)",
//     duration: 4.5,
//     ease: "power2.i nOut",
//   });

let peptideContainer = document.getElementById("peptideAnimationContainer");

function LottieScrollTrigger(vars) {
  let playhead = { frame: 0 },
    target = gsap.utils.toArray(vars.target)[0],
    speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
    st = {
      trigger: target,
      pin: true,
      start: "top top",
      end: speeds[vars.speed] || "+=1000",
      scrub: 1,
    },
    animation = lottie.loadAnimation({
      container: target,
      renderer: vars.renderer || "svg",
      loop: false,
      autoplay: false,
      path: vars.path,
    });
  for (let p in vars) {
    // let users override the ScrollTrigger defaults
    st[p] = vars[p];
  }
  animation.addEventListener("DOMLoaded", function () {
    gsap.to(playhead, {
      frame: animation.totalFrames - 1,
      ease: "none",
      onUpdate: () => animation.goToAndStop(playhead.frame, true),
      scrollTrigger: st,
    });
    // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  });
  return animation;
}

LottieScrollTrigger({
  target: "#peptideAnimationContainer",
<<<<<<< HEAD
  path: "https://assets6.lottiefiles.com/packages/lf20_wxucs4yt.json",
=======
  path: "https://assets7.lottiefiles.com/packages/lf20_m4lh7lvj.json",
>>>>>>> parent of f197bc6 (layed framework for peptide animation)
  speed: "+=10000",
  scrub: 1,
  markers: true,
  trigger: peptideContainer,
  start: "top top",
  end: "bottom bottom",
});
