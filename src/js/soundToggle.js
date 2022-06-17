import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Howl, Howler } from "howler";
import normalSound from "../audio/ambientSoundtrack.mp3";
import darkSound from "../audio/darkSoundtrack.mp3";
import MorphSVG from "gsap/MorphSVGPlugin";
import { wave } from "./waveAnim";

gsap.registerPlugin(SplitText, ScrollTrigger, MorphSVG);

// Sound Variables
var sound = false;
var activeTrack = "normalSound";
const maxVol = 0.5;
const dur = 1050;
// Declare Objects
let soundButtons = gsap.utils.toArray("#soundButtons button");
let soundOnBtn = document.querySelector("#yesSoundContainer > button");
let soundOffBtn = document.querySelector("#noSoundContainer > button");
const soundIndi = document.querySelector("div#soundIndicatorContainer");
let soundLabel = gsap.utils.toArray("div#soundLabelSwitch > div > h5");
let labelOn = soundLabel[0];
let labelOff = soundLabel[1];

const normalTrack = new Howl({
  src: [normalSound],
});
const normalTrackDuration = Math.floor(normalTrack.duration * 1000);
const darkTrack = new Howl({
  src: [darkSound],
});
const darkTrackDuration = Math.floor(darkTrack.duration * 1000);

labelOn.split = new SplitText(labelOn, {
  type: "chars",
});
labelOff.split = new SplitText(labelOff, {
  type: "chars",
});

let labelTL = gsap.timeline({
  paused: true,
});

labelTL
  .to(
    labelOn.split.chars,
    {
      yPercent: -100,
      duration: 0.42,
      ease: "power2.inOut",
      stagger: 0.03,
    },
    0
  )
  .to(
    labelOff.split.chars,
    {
      yPercent: -100,
      duration: 0.42,
      ease: "power2.inOut",
      stagger: 0.03,
    },
    0.11
  );

// Sound Ask Controllers

const soundIndicatorToggle = (e) => {
  if (!sound) {
    labelTL.reverse();
    gsap.to(wave, {
      amplitude: 0.5,
      duration: 1,
      ease: "power3.inOut",
    });
  } else if (sound) {
    labelTL.play();
    gsap.to(wave, {
      amplitude: 3.25,
      duration: 1,
      ease: "power3.inOut",
    });
  }
};

const handleAudioToggle = (e) => {
  if (!sound) {
    if (activeTrack === "normalSound") {
      sound = true;
      normalTrack.fade(0, maxVol, dur);
      normalTrack.play();
    } else if (activeTrack === "darkSound") {
      sound = true;
      normalTrack.fade(0, maxVol, dur);
      darkTrack.play();
    }
  } else if (sound) {
    if (activeTrack === "normalSound") {
      sound = false;
      normalTrack.fade(maxVol, 0, dur);
      setTimeout(() => {
        normalTrack.pause();
      }, dur);
    } else if (activeTrack === "darkSound") {
      sound = false;
      darkTrack.fade(maxVol, 0, dur);
      setTimeout(() => {
        darkTrack.pause();
      }, dur);
    }
  }
};

export const handleAudioSwitch = () => {
  console.log(activeTrack);
  if (activeTrack === "normalSound") {
    activeTrack = "darkSound";
    normalTrack.fade(maxVol, 0, dur);
    setTimeout(() => {
      normalTrack.pause();
    }, dur);
    darkTrack.play();
    darkTrack.fade(0, maxVol, dur);
  } else if (activeTrack === "darkSound") {
    normalTrack.fade(0, maxVol, dur);
    darkTrack.fade(maxVol, 0, dur);
    setTimeout(() => {
      darkTrack.pause();
    }, dur);
    activeTrack = "normalSound";
  }
  console.log(activeTrack);
};

soundIndi.addEventListener("click", () => {
  handleAudioToggle();
  soundIndicatorToggle();
});

const interfaceSounds = () => {};
// let whyDoesFoldingMatter = document.querySelector("#whyDoesFoldingMatter");

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

// soundButtons.forEach((button) => {
//   button.addEventListener("click", (event) => {
//     audioAskTL.play();
//   });
// });
