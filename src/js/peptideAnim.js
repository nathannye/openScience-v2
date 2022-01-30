import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import lottie from "lottie-web";
import colors from "./colors";
import soundDangerReverse from "./soundToggle";
import { color, cross, reduce } from "d3";
import { nglStage } from "./introAnims";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

let peptideAnimContainer = document.getElementById("peptideAnimationContainer");

let peptideAnimText = document.getElementById("whatIsFoldingText");
let firstText = document.querySelector("#whatIsFoldingText > div:first-child");
let firstHead = firstText.querySelector("h2");
let firstPara = firstText.querySelector("p");
let secondText = document.querySelector("#whatIsFoldingText > div:last-child");
let secondHead = secondText.querySelector("h2");
let secondPara = secondText.querySelector("p");
let html = document.querySelector("html");

let firstTextAnim = gsap.timeline({
  paused: true,
});

firstHead.split = new SplitText(firstText, {
  type: "words, lines",
  linesClass: "splitLine",
});
firstPara.split = new SplitText(firstPara, {
  type: "words, lines",
  linesClass: "splitLine",
});

firstTextAnim
  .from(firstHead.split.words, {
    yPercent: 100,
    autoAlpha: 0,
    duration: 1,
    ease: "power4.inOut",
    stagger: 0.0142,
  })
  .from(firstPara.split.lines, {
    autoAlpha: 0,
    y: 15,
    delay: 0.25,
    rotateY: -8,
    ease: "power2.out",
    stagger: 0.09,
    duration: 0.9,
  });

// function firstPeptideText() {
//   if (firstText.anim) {
//     // firstText.anim.progress(1).kill();
//     firstHead.split.revert();
//   }
// }

var peptideAnim = lottie.loadAnimation({
  container: peptideAnimContainer,
  renderer: "svg",
  loop: false,
  quality: "low",
  autoplay: false,
  path: "https://assets10.lottiefiles.com/packages/lf20_c5t9h6bj.json",
});

var frameSegments = [
  [0, 130],
  [131, 180],
  [181, 240],
];

let peptideOutTL = gsap.timeline({
  paused: true,
});

peptideOutTL.to(secondText, {});

peptideAnim.addEventListener("DOMLoaded", (event) => {
  let dangerClickTargets = gsap.utils.toArray(".errorTarget");
  dangerClickTargets.forEach((target) => {
    target.addEventListener("click", (event) => {
      dangerClickClear += 1;
      target.classList.add("deadMarker");
      if (dangerClickClear === 3) {
        soundDangerReverse;
        peptideAnim.playSegments([131, 180]);
      }
    });
  });
});

// gsap.set(firstText, {
//   autoAlpha: 0,
// });

gsap.set(secondText, {
  autoAlpha: 0,
});

export default function createPeptideTL() {
  let peptideTL = gsap.timeline({
    paused: true,
    scrollTrigger: {
      trigger: whatIsFolding,
      start: "top top",
      markers: true,
      end: "bottom top",
      pin: peptideAnimText,
    },
  });
  peptideTL
    .call(peptideTL.scrollTrigger.refresh())
    .from(peptideAnimContainer, {
      autoAlpha: 0,
      filter: "blur(6px)",
    })
    .call(firstTextAnim.play);
}

peptideAnim.addEventListener("DOMLoaded", (event) => {
  createPeptideTL();
});

let dangerSeriesTrigger = document.getElementById("peptideSlider");

// Click to move TL to danger part
let dangerTL = gsap.timeline({
  paused: true,
});

dangerTL
  // Arrives at danger state
  .to(
    secondText,
    {
      autoAlpha: 1,
      duration: 0.45,
    },
    "swap"
  )
  .to(
    firstText,
    {
      autoAlpha: 0,
      duration: 0.45,
    },
    "swap"
  )
  .to(
    nglStage,
    {
      filter: "blur(5px) !important",
      autoAlpha: 0.3,
    },
    "swap"
  )
  .call(peptideAnim.playSegments([0, 130]))
  .to(dangerSeriesTrigger, {
    autoAlpha: 0,
    duration: 0.4,
  });
dangerSeriesTrigger.addEventListener("click", (event) => {
  dangerTL.play();
});

let dangerClearTL = gsap.timeline({
  paused: true,
});

dangerClearTL.to(html, {
  overflowY: "auto",
});

// Danger Click Targets
var dangerClickClear = 0;

let numbers = document.getElementById("millionAcross");
let wdwn = document.getElementById("whyDoWeNeed");
numbers.split = new SplitText(numbers, {
  type: "chars, lines",
  linesClass: "splitLIne",
});
let millionTL = gsap.timeline({
  scrollTrigger: {
    scrub: 0.4,
    trigger: wdwn,
    start: "top bottom-=18%",
    end: "bottom top",
  },
});

millionTL
  .from(
    wdwn,
    {
      background: "transparent",
    },
    "start"
  )
  .from(
    numbers.split.chars,
    {
      yPercent: 100,
      stagger: 0.1,
    },
    "start"
  );

// let millionLateral = gsap.timeline({
//   scrollTrigger: {
//     scrub: 0.4,
//     markers: true,
//     trigger: wdwn,
//     start: "top top",
//     end: "bottom top",
//   },
// });

// millionLateral.to(numbers, {
//   xPercent: -35,
// });
// .to(
//   numbers,
//   {
//     xPercent: -47,
//   },
//   "start"
// );

let twoThouFlip = gsap.utils.toArray("#twoThou .numberFlipperContainer > div");
let fiveThouFlip = gsap.utils.toArray(
  "#fiveThou .numberFlipperContainer > div"
);
let crossOuts = gsap.utils.toArray(".crossOut");

let twoThouChars = document.querySelectorAll(
  "#twoThou .commaChar, #twoThou .dollarChar"
);
let fiveThouChars = document.querySelectorAll(
  "#fiveThou .commaChar, #fiveThou .dollarChar"
);

let reduceCost = document.getElementById("helpingReduceCosts");

let numbersFlipping = gsap.timeline({
  scrollTrigger: {
    trigger: reduceCost,
    start: "top bottom-=44%",
    markers: true,
  },
});
gsap.set([twoThouFlip, fiveThouFlip], {
  autoAlpha: 0,
});

numbersFlipping
  .to(
    fiveThouFlip,
    {
      yPercent: -75,
      duration: 0.79,
      autoAlpha: 1,

      ease: "power3.inOut",
      stagger: {
        each: ".07",
        ease: "power3.inOut",
      },
    },
    "start"
  )
  .from(
    fiveThouChars,
    {
      autoAlpha: 0,
      stagger: 0.02,
    },
    "start"
  )
  .to(
    twoThouFlip,
    {
      yPercent: -75,
      autoAlpha: 1,

      duration: 0.79,
      ease: "power3.inOut",
      stagger: {
        each: ".07",
        ease: "power3.inOut",
      },
    },
    "start+=.28"
  )
  .from(
    twoThouChars,
    {
      autoAlpha: 0,
      stagger: 0.02,
    },
    "start+=.15"
  )
  .from(
    crossOuts,
    {
      scaleX: 0,
      transformOrigin: "left center",
      ease: "power4.inOut",
      duration: 0.58,
      stagger: 0.08,
    },
    ">+=.05",
    "crossOut"
  )
  .to(
    [fiveThouChars, fiveThouFlip, twoThouChars, twoThouFlip],
    {
      opacity: 0.4,
      duration: 0.32,
      stagger: 0.01,
    },
    "crossOut-=.34"
  );
