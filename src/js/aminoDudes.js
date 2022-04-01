import Lottie from "lottie-web";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import colors from "./colors";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
const paths = ["#firstPath", "#secondPath", "#thirdPath", "#fourthPath"];

let grain = document.getElementById("grain");
let text = document.querySelectorAll(
  "#whyDoWeNeed h2, #whyDoWeNeed p, #whyDoWeNeed h4"
);
let soundIndi = document.querySelector("div#soundIndicatorContainer");
// let nglStage = document.querySelector("#viewport");

let cnv = document.querySelector("#viewport canvas");
let container = document.getElementById("whyDoWeNeed");
let animContainer = gsap.utils.toArray(".aminoDudeContainer");

container.h2 = document.querySelector("#whyDoWeNeed h2");
container.p = document.querySelector("#whyDoWeNeed p");
container.h4 = document.querySelector("#whyDoWeNeed h4");

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: container,
    start: "top top+=2%",
  },
});
container.h2.split = new SplitText(container.h2, {
  type: "words, lines",
  linesClass: "splitLine",
});
container.p.split = new SplitText(container.p, {
  type: "lines",
});

tl.from(
  container.h4,
  {
    x: -10,
    autoAlpha: 0,
    duration: 1.2,
    ease: "power3.inOut",
  },
  "go"
)
  .from(
    container.h2.split.words,
    {
      yPercent: 100,
      autoAlpha: 0,
      duration: 1,
      ease: "power4.inOut",
      stagger: 0.0142,
    },
    "go+=.35"
  )
  .from(
    container.p.split.lines,
    {
      autoAlpha: 0,
      y: 15,
      delay: 0.6,
      rotateY: -8,
      ease: "power2.out",
      stagger: 0.09,
      duration: 0.9,
    },
    "go+=.65"
  );

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

let animFour = Lottie.loadAnimation({
  container: animContainer[3],
  path: "https://assets5.lottiefiles.com/packages/lf20_cpwcuygx.json",
  autoplay: true,
  quality: "low",
  loop: true,
});

let wrappers = document.querySelectorAll("html, body");

let numbers = document.getElementById("millionAcross");
numbers.split = new SplitText(numbers, {
  type: "chars, lines",
  linesClass: "splitLIne",
});

let needTL = gsap.timeline({
  scrollTrigger: {
    trigger: container,
    start: "top top",
    pin: true,
    end: "bottom top",
    scrub: 0.9,
  },
  onComplete: () => {
    gsap.to(cnv, {
      autoAlpha: 1,
      duration: 0.3,
    });
  },
});

needTL
  .to(
    text,
    {
      color: colors.blue,
      duration: 4,
    },
    0
  )
  .to(
    soundIndi,
    {
      filter: "saturate(0) brightness(.3)",
      duration: 4,
    },
    0
  )
  .to(
    wrappers,
    {
      background: colors.gry,
      duration: 10,
    },
    0
  )
  .to(
    grain,
    {
      autoAlpha: 0,
    },
    0
  )
  .to(
    cnv,
    {
      autoAlpha: 0,
    },
    0
  )
  .from(
    numbers.split.chars,
    {
      yPercent: 100,
      duration: needTL.duration,
    },
    "main"
  )
  .to(
    animContainer[0],
    {
      duration: 15,
      motionPath: {
        end: 1,
        start: 0.35,
        path: paths[0],
        align: paths[0],
        //   alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
    },
    "main"
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
    "main"
  )
  .to(
    animContainer[2],
    {
      duration: 19,
      motionPath: {
        end: 0.1,
        start: 1,
        path: paths[2],
        align: paths[2],
        // alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
    },
    "main"
  )
  .to(
    animContainer[3],
    {
      duration: 24,
      motionPath: {
        end: 0.4,
        start: 0,
        path: paths[3],
        align: paths[3],
        // alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
    },
    "main"
  )
  .to(
    cnv,
    {
      autoAlpha: 1,
      duration: 7,
      delay: 4,
    },
    "end"
  )
  .to(
    wrappers,
    {
      background: colors.dark,
      duration: 7,
    },
    "end"
  )
  .to(
    text,
    {
      color: colors.white,
      duration: 7,
    },
    "end"
  )
  .to(
    soundIndi,
    {
      filter: "unset",
      duration: 7,
    },
    "end"
  );
