import Lottie from "lottie-web";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import colors from "./colors";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
const paths = ["#firstPath", "#secondPath", "#thirdPath"];

let grain = document.getElementById("grain");
let container = document.getElementById("whyDoWeNeed");
let animContainer = gsap.utils.toArray(".aminoDudeContainer");

let animOne = Lottie.loadAnimation({
  container: animContainer[0],
  path: "https://assets5.lottiefiles.com/packages/lf20_cpwcuygx.json",
  autoplay: true,
  quality: "low",
  loop: true,
});

let animTwo = Lottie.loadAnimation({
  container: animContainer[1],
  path: "https://assets5.lottiefiles.com/packages/lf20_cpwcuygx.json",
  autoplay: true,
  quality: "low",
  loop: true,
});

let animThree = Lottie.loadAnimation({
  container: animContainer[2],
  path: "https://assets5.lottiefiles.com/packages/lf20_cpwcuygx.json",
  autoplay: true,
  quality: "low",
  loop: true,
});

// const anim = [];

// for (let i = 0; i < paths.length; i++) {
//   anim[i] = Lottie.loadAnimation({
//     container: animContainer[i],
//     path: "https://assets5.lottiefiles.com/packages/lf20_cpwcuygx.json",
//     autoplay: true,
//     quality: "low",
//     loop: true,
//   });
//   anim.addEventListener("DOMLoaded", (event) => {
// let tl = gsap.timeline({
//   scrollTrigger: {
//     trigger: container,
//     start: "top bottom",
//     scrub: 1,
//     end: "bottom top",
//   },
// });

//   console.log(paths[i]);
// }

let html = document.querySelector("html");
let body = document.querySelector("body");

let numbers = document.getElementById("millionAcross");
numbers.split = new SplitText(numbers, {
  type: "chars, lines",
  linesClass: "splitLIne",
});

let needTL = gsap.timeline({
  scrollTrigger: {
    trigger: container,
    start: "top top",
    end: "bottom top",
    scrub: 0.3,
    toggleActions: "play reset reverse play",
  },
  //     onComplete: () => {
  //       gsap.to(html, {

  //       })
  //   },
});

needTL
  .to(
    grain,
    {
      autoAlpha: 0,
      duration: 0.1,
    },
    0
  )
  // .from(
  //   nglStage,
  //   {
  //     autoAlpha: 0,
  //   },
  //   0
  // )
  //   .to(
  //     body,
  //     {
  //       background: colors.gry,
  //       duration: 2,
  //     },
  //     0
  //   )
  //   .to(
  //     html,
  //     {
  //       background: colors.gry,
  //       duration: 2,
  //     },
  //     0
  //   )
  //   .from(
  //     container,
  //     {
  //       background: "transparent",
  //       duration: 3,
  //     },
  //     0
  //   )
  .from(
    numbers.split.chars,
    {
      yPercent: 100,
      stagger: 3,
      duration: 20,
    },
    0
  )
  .to(
    animContainer[0],
    {
      duration: 25,
      motionPath: {
        end: 0.1,
        start: 0.85,
        path: paths[0],
        align: paths[0],
        //   alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
    },
    0
  )
  .to(
    animContainer[1],
    {
      duration: 25,
      motionPath: {
        end: 0.2,
        start: 0.9,
        path: paths[1],
        align: paths[1],
        // alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
    },
    0
  )
  .to(
    animContainer[2],
    {
      duration: 25,
      motionPath: {
        end: 0.5,
        start: 1,
        path: paths[2],
        align: paths[2],
        // alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
    },
    0
  );

// let millionTL = gsap.timeline({
//   scrollTrigger: {
//         scrub: 0.4,
//       pin:L true
//     trigger: wdwn,
//     start: "top bottom-=18%",
//     end: "bottom top",
//   },
// });

// millionTL
