import gsap from "gsap";

import splitText from "gsap/SplitText";
import scrollTrigger from "gsap/ScrollTrigger";
import { random } from "gsap/gsap-core";
// import { GLTFLoader } from "three/examples/js/loaders/GLTFLoader";

gsap.registerPlugin(scrollTrigger);

scrollTrigger.defaults({
  start: "top bottom-=15%",
  end: "top top+=20%",
  toggleActions: "play reverse play reverse",
});

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
    scrollTrigger: {
      trigger: e,
      onEnter: sorth3(),
      onLeave: sorth3reverse(),
      onEnterBack: sorth3(),
      onLeaveBack: sorth3reverse(),
    },
  });
});

// Audio Control

let soundOn = document.querySelector("#yesSoundContainer > button");
let soundOff = document.querySelector("#noSoundContainer > button");

function audioVolumeIn() {
  const audio = document.querySelector("audio");
  if (audio.volume) {
    var InT = 0;
    var setVolume = 0.2; // Target volume level for new song
    var speed = 0.005; // Rate of increase
    audio.volume = InT;
    var eAudio = setInterval(function () {
      InT += speed;
      audio.volume = InT.toFixed(1);
      if (InT.toFixed(1) >= setVolume) {
        clearInterval(eAudio);
      }
    }, 50);
  }
}

function audioVolumeOut(q) {
  if (q.volume) {
    var InT = 0.4;
    var setVolume = 0; // Target volume level for old song
    var speed = 0.005; // Rate of volume decrease
    q.volume = InT;
    var fAudio = setInterval(function () {
      InT -= speed;
      q.volume = InT.toFixed(1);
      if (InT.toFixed(1) <= setVolume) {
        clearInterval(fAudio);
        //alert('clearInterval fAudio'+ InT.toFixed(1));
      }
    }, 50);
  }
}
let soundButtons = gsap.utils.toArray("#soundButtons button");
console.log(soundButtons);

let soundAskHeader = document.querySelector("#soundAsk h2");

let audioAskTL = gsap.timeline({
  paused: true,
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
  );

soundOn.addEventListener("click", (event) => {
  audioAskTL.play();
});

let title = gsap.utils.toArray("#introHeadingContainer h1");

let openSource = title[0];
let openScience = title[1];

var introHeadingsTL = gsap.timeline({
  paused: true,
});

introHeadingsTL
  .to(
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
  )
  .to(
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
