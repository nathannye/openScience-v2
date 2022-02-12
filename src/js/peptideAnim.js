import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import Draggable from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";
import lottie from "lottie-web";
import CustomEase from "gsap/src/CustomEase";
import colors from "./colors";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import soundDangerReverse from "./soundToggle";
import { color, cross, reduce } from "d3";
import { nglStage } from "./introAnims";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(InertiaPlugin);
gsap.registerPlugin(DrawSVGPlugin);

let peptideAnimContainer = document.getElementById("peptideAnimationContainer");
let peptideLottieContainer = document.getElementById("peptideLottieContainer");
let peptideAnimText = document.getElementById("whatIsFoldingText");
let firstText = document.querySelector("#whatIsFoldingText > div:first-child");
let firstHead = firstText.querySelector("h2");
let firstPara = firstText.querySelector("p");
let secondText = document.querySelector("#whatIsFoldingText > div:last-child");
let secondHead = secondText.querySelector("h2");
let secondPara = secondText.querySelector("p");
let html = document.querySelector("html");
let whatIsFolding = document.getElementById("whatIsFolding");

console.log(firstPara);

let firstTextAnim = gsap.timeline({
  paused: true,
  scrollTrigger: {
    trigger: whatIsFolding,
    start: "top top",
    // markers: true,
  },
});

firstHead.split = new SplitText(firstText, {
  type: "words, lines",
  linesClass: "splitLine",
});
firstPara.split = new SplitText(firstPara, {
  type: "lines",
});

firstTextAnim
  .from(
    firstHead.split.words,
    {
      yPercent: 30,
      autoAlpha: 0,
      duration: 1,
      ease: "power4.inOut",
      stagger: 0.0142,
    },
    "start"
  )
  .from(
    firstPara.split.lines,
    {
      autoAlpha: 0,
      y: 55,
      delay: 0.25,
      rotateY: -8,
      ease: "power2.out",
      stagger: 0.09,
      duration: 0.9,
    },
    "start"
  );

// function firstPeptideText() {
//   if (firstText.anim) {
//     // firstText.anim.progress(1).kill();
//     firstHead.split.revert();
//   }
// }

var peptideAnim = lottie.loadAnimation({
  container: peptideLottieContainer,
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

let dangerClearTL = gsap.timeline({
  paused: true,
});

dangerClearTL
  .to(html, {
    overflowY: "auto",
  })
  .to(nglStage, {
    filter: "blur(4px) saturate(1) hue-rotate(0deg)",
    duration: 3,
  });

// peptideOutTL.to(secondText, {});

peptideAnim.addEventListener("DOMLoaded", (event) => {
  // let errorTwo = document.getElementById("errorTwo");
  // var appendMe = lottie.loadAnimation({
  //   container: errorTwo,
  //   renderer: "svg",
  //   loop: true,
  //   autoplay: true,
  //   path: "https://assets5.lottiefiles.com/packages/lf20_szqyrfxy.json",
  // });

  // console.log(appendMe);

  let dangerClickTargets = gsap.utils.toArray(".errorTarget");
  dangerClickTargets.forEach((target) => {
    target.addEventListener("click", (event) => {
      dangerClickClear += 1;
      target.classList.add("deadMarker");
      if (dangerClickClear === 3) {
        soundDangerReverse;
        peptideAnim.playSegments([131, 180]);
        dangerClearTL.play();
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

gsap.set(peptideLottieContainer, {
  filter: "blur(5.5px)",
});

let dangerSeriesTrigger = document.getElementById("peptideSliderContainer");
let peptideSVG = peptideLottieContainer.querySelector(
  "svg:not(#sliderCircle, #sliderCircleBacker)"
);

let dangerTL = gsap.timeline({
  paused: true,
});

let flickerTL = gsap.timeline({
  paused: true,
});

flickerTL.yoyo(true);
flickerTL.repeat(-1);

flickerTL
  .to(nglStage, {
    filter: "blur(10px) saturate(1.3) brightness(.93)",
    ease: "rough({ strength: 1, points: 12, template: none.in, taper: none, randomize: true, clamp: true })",
    duration: 3,
  })
  .to(nglStage, {
    filter: "blur(9px) saturate(1.2) brightness(.85)",
    ease: "rough({ strength: 1, points: 12, template: none.in, taper: none, randomize: true, clamp: true })",
    duration: 4.2,
  });

dangerTL
  // Arrives at danger state
  .to(peptideLottieContainer, {
    filter: "blur(0px)",
    duration: 0.5,
  })
  .to(
    secondText,
    {
      autoAlpha: 1,
      duration: 0.45,
    },
    "swap",
    ">"
  )
  .to(
    firstText,
    {
      autoAlpha: 0,
      duration: 0.45,
    },
    "swap"
  )
  .call(flickerTL.play)
  .call(peptideAnim.playSegments([0, 130]))
  .to(dangerSeriesTrigger, {
    autoAlpha: 0,
    duration: 0.4,
  });

let draggerTL = gsap.timeline({
  paused: true,
});

let knob = document.getElementById("peptideKnob");
let sliderCirclePath = document.querySelector("#sliderCircle > circle");

draggerTL
  .to(
    sliderCirclePath,
    {
      drawSVG: "0%",
      duration: 0.5,
      ease: "power2.inOut",
    },
    "start"
  )
  .to(
    knob,
    {
      scale: 0.4,
      duration: 0.31,
      ease: CustomEase.create(
        "custom",
        "M0,0 C0,0 0.056,-0.002 0.09,-0.011 0.174,-0.034 0.201,-0.079 0.286,-0.102 0.325,-0.112 0.385,-0.15 0.45,-0.132 0.6,-0.088 0.696,-0.148 0.91,0.626 0.949,0.771 1,1 1,1 "
      ),
      autoAlpha: 0,
      filter: "blur(4px)",
    },
    "start+=.37"
  );

function createPeptideDraggable() {
  Draggable.create("#peptideSlider", {
    inertia: true,
    type: "rotation",
    trigger: knob,
    bounds: { maxRotation: 360, minRotation: 0 },
    onThrowComplete: function () {
      if (this.rotation === 360) {
        draggerTL.play();
        dangerTL.play();
      }
    },
    onPress: function () {
      gsap.to(knob, {
        scale: 1.4,
        color: colors.white,
      });
    },
    onRelease: function () {
      gsap.to(knob, {
        scale: 1,
        background: colors.ylw,
      });
    },
    // onDrag: function () {
    //   let d = this.rotation / 3.6;
    //   let e = `${d}%`;
    //   console.log(e);

    //   gsap.to(sliderCirclePath, {
    //     drawSVG: e,
    //   });
    // },
  });
}

export default function createPeptideTL() {
  let peptideTL = gsap.timeline({
    paused: true,
    scrollTrigger: {
      trigger: whatIsFolding,
      start: "top top",
      markers: true,
      end: "bottom top",
    },
  });

  let dragDirections = document.getElementById("dragDirections");
  dragDirections.split = new SplitText(dragDirections, {
    type: "words, lines",
    linesClass: "splitLine",
  });

  peptideTL
    .call(peptideTL.scrollTrigger.refresh())
    .to(nglStage, {
      filter: "saturate(.5) blur(15px)",
      duration: 0.9,
    })
    .fromTo(
      peptideLottieContainer,
      { autoAlpha: 0, filter: "blur(0px)" },
      { autoAlpha: 0.4, duration: 0.7, filter: "blur(8px)" },
      "start"
    )
    .from(
      sliderCirclePath,
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 0.93, ease: "power3.inOut" },
      ">",
      "draggerIn"
    )
    .from(
      knob,
      {
        scale: 0,
        duration: 0.43,
        ease: "back.out(1.3)",
      },
      "draggerIn+=.3"
    )
    .from(
      dragDirections.split.words,
      {
        yPercent: 100,
        stagger: 0.05,
        duration: 0.7,
        ease: "power3.inOut",
      },
      "draggerIn+=.11"
    )

    .call(firstTextAnim)
    .call(createPeptideDraggable);
}

peptideAnim.addEventListener("DOMLoaded", (event) => {
  createPeptideTL();
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
