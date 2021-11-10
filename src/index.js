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

let h3 = gsap.utils.toArray("h3");

let h3Split = new splitText(h3, {
  type: "chars",
});

gsap.set(h3Split.chars, {
  autoAlpha: 0,
  // y: 20,
  z: -540,
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
    duration: 0.75,
    ease: "power1.inOut",
    stagger: 0.004,
    scrollTrigger: {
      trigger: e,
      onEnter: sorth3(),
      onLeave: sorth3reverse(),
      onEnterBack: sorth3(),
      onLeaveBack: sorth3reverse(),
    },
  });
});

// setting indexes for sections
