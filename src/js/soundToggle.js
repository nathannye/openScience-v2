import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Howl, Howler } from "howler";
import normalSound from "../audio/ambientSoundtrack.mp3";
import darkSound from "../audio/darkSoundtrack.mp3";

gsap.registerPlugin(SplitText, ScrollTrigger);

var soundOn = false;

let soundButtons = gsap.utils.toArray("#soundButtons button");
const soundIndi = document.querySelector("div#soundIndicatorContainer");

let soundLabel = gsap.utils.toArray("div#soundLabelSwitch > div > h5");

let labelOn = soundLabel[0];
let labelOff = soundLabel[1];

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
      duration: 0.32,
      ease: "power2.inOut",
      stagger: 0.05,
    },
    "start"
  )
  .to(
    labelOff.split.chars,
    {
      yPercent: -50,
      delay: 0.2,
      duration: 0.32,
      ease: "power2.inOut",
      stagger: 0.05,
    },
    "start"
  );

var tracks = new Howl({
  src: [normalSound],
});

var darkTrack = new Howl({
  src: [darkSound],
});

// Sound Ask Controllers
let soundOnBtn = document.querySelector("#yesSoundContainer > button");
let soundOffBtn = document.querySelector("#noSoundContainer > button");

const soundFadeDuration = 1050;

// soundOnBtn.addEventListener("click", (event) => {
//   tracks.play();
//   tracks.fade(0, 1, soundFadeDuration);
//   var soundOn = true;
// });

// soundOffBtn.addEventListener("click", (event) => {
//   var soundOn = false;
//   tracks.fade(1, 0, soundFadeDuration);
// });

soundIndi.addEventListener("click", (event) => {
  if (!tracks.playing() || !darkTrack.playing()) {
    // Run these if sound isn't playing already
    labelTL.play();
    tracks.play();
    tracks.fade(0, 1, soundFadeDuration);
    var soundOn = true;
  } else {
    // Run these if sound is already playing
    tracks.fade(1, 0, soundFadeDuration);
    labelTL.reverse();
    setTimeout(() => {
      tracks.pause();
    }, soundFadeDuration);

    var soundOn = false;
  }
});

let dangerSeriesTrigger = document.getElementById("peptideSlider");

dangerSeriesTrigger.addEventListener("click", (event) => {
  // if (soundOn) {

  tracks.fade(1, 0, soundFadeDuration);
  setTimeout(() => {
    tracks.pause();
  }, soundFadeDuration);

  darkTrack.play();
  darkTrack.fade(0, 1, soundFadeDuration);
  // }
});

export default function soundDangerReverse() {
  darkTrack.fade(1, 0, soundFadeDuration);
  setTimeout(() => {
    darkTrack.pause();
  }, soundFadeDuration);

  tracks.fade(0, 1, soundFadeDuration);
  setTimeout(() => {
    tracks.pause();
  }, soundFadeDuration);
}

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
