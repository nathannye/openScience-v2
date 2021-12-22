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

const teal = "#13f1df";
const ylw = "#ebd664";
const blue = "#001f4e";
const white = "white";

let h3 = gsap.utils.toArray("section.interstitial h3");

h3.split = new splitText(h3, {
  type: "words",
});

let whatDoProteins = h3[1];

// h3.forEach((e) => {
//   gsap.from(h3.split.words, {
//     scrollTrigger: {
//       trigger: h3,
//       pin: true,
//       start: "top center",
//       markers: true,
//     },
//     transformOrigin: "center center",
//     autoAlpha: 0,
//     duration: 1.5,
//     z: -28,
//     color: ylw,
//     ease: "power4.out",
//     stagger: {
//       each: 0.052,

//       from: "edges",
//     },
//   });
// });

let introPara = document.querySelector("#introPanel p");

introPara.split = new splitText(introPara, {
  type: "lines,chars",
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
let soundAskHeader = document.querySelector("#soundAsk h2");
const body = document.querySelector("body");

let titles = document.querySelectorAll("#introHeadingContainer h1");

let introPanel = document.querySelector("#introPanel");

let openSource = titles[0];
let openScience = titles[1];

gsap.set(body, {
  overflowY: "hidden",
});

openSource.split = new splitText(openSource, {
  type: "chars",
});
openScience.split = new splitText(openScience, {
  type: "chars",
});

const titleTL = gsap.timeline({
  // paused: true,
  onComplete: function () {
    createIntroOutTL();
  },
});

gsap.set(openSource.split.chars, {
  opacity: 0,
  y: 50,
  color: teal,
});
gsap.set(openScience.split.chars, {
  opacity: 0,
  y: -25,
  color: teal,
});

titleTL
  .to(introPanel, {
    autoAlpha: 1,
    duration: 0.01,
  })
  .to(body, {
    overflowY: "scroll",
  })
  .to(
    openSource.split.chars,
    {
      y: 0,
      opacity: 1,
      color: white,
      stagger: {
        each: 0.01,
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
        each: 0.01,
        ease: "power2.inOut",
        from: "start",
      },
      duration: 1.3,
      ease: "power4.inOut",
    },
    "start+=.167"
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
audioAskTL = null;
let audioAskTL = gsap.timeline({
  paused: true,
  onComplete: function () {
    // titleTL.play();
    audioAskTL.kill();
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
// .to(soundAsk, {
//   display: none,
// });

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
  yPercent: -60,
});

gsap.from(images[1], {
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

gsap.from(images[3], {
  scrollTrigger: {
    scrub: true,
    start: "top bottom",
    end: "bottom top",
    trigger: "#numberOfUsersPanel",
  },
  yPercent: 87,
});

let whatDoProteinsTL = gsap.timeline({
  paused: true,
});

// Paragraphs anim

let paras = gsap.utils.toArray("p:not(#introPanel p)");

paras.split = new splitText(paras, {
  type: "lines",
});

function createIntroOutTL() {
  let introOutTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#introPanel",
      start: "top top",
      scrub: 1,
      pin: true,
      paused: true,
    },
    onComplete: function () {
      createWhatDoProteins();
      whatDoProteinsTL.play();
    },
  });
  introOutTL
    .to(
      openSource.split.chars,
      {
        z: 22,
        y: -6,
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
        y: 12,
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

function createWhatDoProteins(){
    gsap.from(h3.split.words, {
    scrollTrigger: {
      trigger: h3,
      pin: true,
      start: "top center",
      markers: true,
    },
    transformOrigin: "center center",
    autoAlpha: 0,
    duration: 1.5,
    z: -28,
    color: ylw,
    ease: "power4.out",
    stagger: {
      each: 0.052,

      from: "edges",
    },
  });
}