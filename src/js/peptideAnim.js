import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import lottie from "lottie-web";
import colors from "./colors";
import { soundDangerReverse } from "./soundToggle";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

let peptideAnimContainer = document.getElementById("peptideAnimationContainer");

let peptideAnimText = document.getElementById("whatIsFoldingText");
let firstText = document.querySelector("#whatIsFoldingText > div:first-child");
let secondText = document.querySelector("#whatIsFoldingText > div:last-child");
let html = document.querySelector("html");

var peptideAnim = lottie.loadAnimation({
  container: peptideAnimContainer,
  renderer: "svg",
  loop: false,
  quality: "low",
  autoplay: false,
  path: "https://assets7.lottiefiles.com/packages/lf20_fgp8jsj8.json",
});

var frameSegments = [
  [0, 130],
  [131, 180],
  [181, 240],
];

peptideAnim.addEventListener("DOMLoaded", (event) => {
  let dangerClickTargets = gsap.utils.toArray("#errorTwo");
  dangerClickTargets.forEach((target) => {
    target.addEventListener("click", (event) => {
      // dangerClickClear += 3;
      target.classList.add("deadMarker");
      console.log("killed marker");
      // if (dangerClickClear === 3) {
      soundDangerReverse();
      peptideAnim.playSegments([131, 180]);
      // }
    });
  });
});

gsap.set(firstText, {
  autoAlpha: 0,
});

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
    })
    .to(firstText, {
      autoAlpha: 1,
      duration: 0.45,
    });
  // .to(html, {
  //   overflowY: "hidden",
  // });
}

peptideAnim.addEventListener("DOMLoaded", (event) => {
  createPeptideTL();
});

let dangerSeriesTrigger = document.getElementById("peptideSlider");

// Click to move TL to danger part
let dangerTL = gsap.timeline({});

dangerSeriesTrigger.addEventListener("click", (event) => {
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
    .call(peptideAnim.playSegments([0, 130]))
    .to(dangerSeriesTrigger, {
      autoAlpha: 0,
      duration: 0.4,
    });
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
  )
  .fromTo(numbers, {
    
  })

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
