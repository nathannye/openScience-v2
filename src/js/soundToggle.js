import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Howl, Howler } from "howler";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

let soundIndi = document.querySelector("div#soundIndicatorContainer");
const sound = document.querySelector("audio#normalSoundtrack");
const darkSound = document.querySelector("audio#darkSoundtrack");

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
      duration: 0.37,
      ease: "power2.inOut",
      stagger: 0.05,
    },
    "start"
  )
  .to(
    labelOff.split.chars,
    {
      yPercent: -100,
      delay: 0.2,
      duration: 0.37,
      ease: "power2.inOut",
      stagger: 0.05,
    },
    "start"
  );

var tracks = new Howl({
  src: [
    require("../audio/ambientSoundtrack.mp3"),
    // require("../audio/darkSoundtrack.mp3"),
  ],
  // sprite: {
  //   normal: [500, 65000],
  //   // dark: [500, 221000],
  // },
  // autoplay: false,
  onload: () => {
    console.log("sound loaded");
  },
  onloaderror: (id, err) => {
    console.log("uh oh", id + err);
  },
});

soundIndi.addEventListener("click", (event) => {
  if (!tracks.playing()) {
    // Run these if sound isn't on
    tracks.play();
  } else {
    // Run these if sound is on
    // soundId = tracks.pause("normal");
    tracks.pause();
  }
  // tracks.play("normal");
  console.log(tracks.playing("normal"));
});

// soundIndi.addEventListener("click", (event) => {
//   disableRapid();
//   if (isPlaying === false) {
//     // Functions when sound starts playing
//     sound.play();
//     labelTL.play();
//     gsap.fromTo(sound, { volume: 0 }, { volume: 1, duration: soundFade });
//     isPlaying = true;
//   } else if (isPlaying) {
//     // Functions when sound gets paused
//     labelTL.reverse();
//     gsap.fromTo(
//       sound,
//       { volume: 1 },
//       {
//         volume: 0,
//         duration: soundFade,
//         onComplete: () => {
//           sound.pause();
//           isPlaying = false;
//         },
//       }
//     );
//     if (darkSound.playing) {
//       darkSound.pause();
//     }
//   }
// });

// Controlling dark soundtrack on Why Does Folding Matter section

let whyDoesFoldingMatter = document.querySelector("#whyDoesFoldingMatter");

// ScrollTrigger.create({
//   trigger: whyDoesFoldingMatter,
//   start: "top center",
//   onEnter: () => {
//     if (isPlaying === true) {
//       gsap.fromTo(sound, { volume: 1 }, { volume: 0, duration: soundFade });

//       gsap.fromTo(
//         darkSound,
//         { volume: 0 },
//         { volume: 1, duration: soundFade }
//       );
//     } else if (isPlaying === false) {
//       darkSound.play();
//     }
//   }),

// ScrollTrigger.create({
//   trigger: whyDoesFoldingMatter,
//   start: "top center",
//   onEnter: () => {
//     if (isPlaying === true) {
//       gsap.fromTo(sound, { volume: 1 }, { volume: 0, duration: soundFade });

//       gsap.fromTo(darkSound, { volume: 0 }, { volume: 1, duration: soundFade });
//     } else if (isPlaying === false) {
//       darkSound.play();
//     }
//   },
// });
