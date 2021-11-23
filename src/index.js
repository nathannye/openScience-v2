import gsap from "gsap";
import splitText from "gsap/SplitText";
import scrollTrigger from "gsap/ScrollTrigger";
import { random } from "gsap/gsap-core";
// import { GLTFLoader } from "three/examples/js/loaders/GLTFLoader";

gsap.registerPlugin(scrollTrigger);
gsap.registerPlugin(splitText);

// scrollTrigger.defaults({
//   start: "top bottom-=15%",
//   end: "top top+=20%",
//   toggleActions: "play reverse play reverse",
// });

let h3 = gsap.utils.toArray("h3.interstitial");

let h3Split = new splitText(h3, {
  type: "chars",
});

gsap.set(h3Split.chars, {
  autoAlpha: 0,
});

function sorth3() {
  h3Split.chars.sort(function () {
    return 0.5 - Math.random();
  });
}

function sorth3reverse() {
  h3Split.chars.sort(function () {
    return h3Split.chars;
  });
}

h3.forEach((e) => {
  gsap.to(h3Split.chars, {
    y: 0,
    autoAlpha: 1,
    duration: 0.65,
    ease: "power1.inOut",
    stagger: 0.014,
    // scrollTrigger: {
    //   trigger: e,
    //   onEnter: sorth3(),
    //   onLeave: sorth3reverse(),
    //   onEnterBack: sorth3(),
    //   onLeaveBack: sorth3reverse(),
    // },
  });
});

let introPara = gsap.utils.toArray("#introPanel p");

introPara.split = new splitText(introPara, {
  type: "lines,chars,words",
});

let d = introPara.split.chars[0];

// Audio Control
let soundOn = document.querySelector("#yesSoundContainer > button");
let soundOff = document.querySelector("#noSoundContainer > button");
let soundtrack = document.querySelector("audio");

soundtrack.currentTime = 0;

soundOn.addEventListener("click", (event) => {
  soundtrack.play();
});

let soundButtons = gsap.utils.toArray("#soundButtons button");
let audioAskSection = document.querySelector("#soundAsk");
let soundAskHeader = document.querySelector("#soundAsk h2");
const body = document.querySelector("body");

let titles = document.querySelectorAll("#introHeadingContainer h1");

let openSource = titles[0];
let openScience = titles[1];

openSource.split = new splitText(openSource, {
  type: "chars",
});
openScience.split = new splitText(openScience, {
  type: "chars",
});

const titleTL = gsap.timeline({
  paused: true,
});

titleTL
  .from(
    openSource.split.chars,
    {
      color: "var(--blue)",
      y: 65,
      opacity: 0,
      color: "teal",
      stagger: 0.01,
      duration: 1.3,
      ease: "power4.inOut",
    },
    "start"
  )
  .from(
    openScience.split.chars,
    {
      color: "var(--blue)",
      y: -40,
      opacity: 0,
      color: "teal",
      stagger: 0.01,
      duration: 1.3,
      ease: "power4.inOut",
    },
    "start+=.167"
  )
  .from(
    introPara.split.words,
    {
      // x: 5,
      y: 9,
      autoAlpha: 0,
      duration: 0.88,
      ease: "power2.inOut",
      stagger: 0.1,
      color: "#13f1df",
    },
    ">-=.55"
  );
// .from(
//   introPara.split.lines,
//   {
//     autoAlpha: 0,
//     y: 15,
//     color: "var(--teal)",
//     transformOrigin: "left",
//     ease: "power2.out",
//     stagger: 0.22,
//     duration: 0.95,
//   },
//   "para"
// )
// .from(
//   introPara.split.chars,
//   {
//     x: 20,
//     stagger: 0.01,
//     duration: 0.01,
//     color: "#13f1df",
//   },
//   "para"
// );

gsap.to(
  openSource,
  {
    scrollTrigger: {
      scrub: 0.5,
      trigger: "#introHeadingContainer",
      start: "top center+=10%",
      ease: "power4",
      end: "bottom top+=10%",
    },
    x: -23,
  },
  "scrolling"
);
gsap.to(
  openScience,
  {
    scrollTrigger: {
      scrub: 0.5,
      ease: "power4",
      trigger: "#introHeadingContainer",
      start: "top center",
      end: "bottom top+=10%",
    },
    x: 23,
  },
  "scrolling"
);

let audioAskTL = gsap.timeline({
  paused: true,
  onComplete: function () {
    titleTL.play();
  },
});

audioAskTL
  .to(
    soundAskHeader,
    {
      duration: 1.28,
      autoAlpha: 0,
      z: 30,
      ease: "power4.inOut",
      filter: "blur(4px)",
    },
    "start"
  )
  .to(
    soundButtons,
    {
      z: 40,
      autoAlpha: 0,
      ease: "power4.inOut",
      filter: "blur(2px)",
      stagger: 0.05,
      delay: 0.148,
    },
    "start"
  )
  .to(soundAsk, {
    autoAlpha: 0,
    duration: 0.7,
    ease: "power2.inOut",
  });

soundButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    audioAskTL.play();
  });
});

// Image section

let images = gsap.utils.toArray(".parallaxImage");

gsap.from(images[0], {
  scrollTrigger: {
    scrub: true,
    start: "top bottom",
    end: "bottom top",
    trigger: "#numberOfUsersPanel",
  },
  yPercent: -40,
});

gsap.from(images[1], {
  scrollTrigger: {
    scrub: true,
    start: "top bottom",
    end: "bottom top",
    trigger: "#numberOfUsersPanel",
  },
  yPercent: -12,
});

gsap.to(images[2], {
  scrollTrigger: {
    scrub: true,
    start: "top bottom",
    end: "bottom top",
    trigger: "#numberOfUsersPanel",
  },
  yPercent: 40,
});

gsap.from(images[3], {
  scrollTrigger: {
    scrub: true,
    start: "top bottom",
    end: "bottom top",
    trigger: "#numberOfUsersPanel",
  },
  yPercent: 60,
});
