import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import colors from "./colors";
import { hamburgerContainer } from "./hamburgerAnim";
import soundIndi from "./soundToggle";
import navDots from "./navMarkerAnim";
import Lottie from "lottie-web";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

let container = document.getElementById("scrollAnimContainer");

function playScrollLottie() {
  var scrollIndi = Lottie.loadAnimation({
    container: container,
    loop: false,
    renderer: "svg",
    autoplay: true,
    path: "https://assets5.lottiefiles.com/packages/lf20_hzdymoq2.json",
  });
}

// Define high level elements
export const nglStage = document.querySelector("#viewport");
let html = document.querySelector("html");
let scrollIndiText = document.querySelector("#scrollIndicator h4");

let scrollIndiSplit = new SplitText(scrollIndiText, {
  type: "lines, chars",
  linesClass: "splitLine",
});

let introPara = document.querySelector("#introPanel p");

function setupIntroParaSplit() {
  introPara.split = new SplitText(introPara, {
    type: "lines",
  });
}

ScrollTrigger.addEventListener("refresh", setupIntroParaSplit);
setupIntroParaSplit();

let titles = document.querySelectorAll("#introHeadingContainer h1");
let openSource = titles[0];
let openScience = titles[1];

let titleTL = gsap.timeline({
  onComplete: function () {
    titleTL.invalidate();
    titleTL.kill();
    createIntroOutTL();
  },
});

openSource.split = new SplitText(openSource, {
  type: "chars",
});
openScience.split = new SplitText(openScience, {
  type: "chars",
});

gsap.set(openSource.split.chars, {
  opacity: 0,
  yPercent: 30,
  color: colors.teal,
});
gsap.set(openScience.split.chars, {
  opacity: 0,
  yPercent: -30,
  color: colors.teal,
});

titleTL
  .to(introPanel, {
    autoAlpha: 1,
    duration: 0.01,
  })
  .fromTo(
    nglStage,
    { filter: "saturate(0) blur(13px)", autoAlpha: 0 },
    {
      filter: "saturate(.68) blur(1px)",
      duration: 3.5,
      delay: 0.8,
      autoAlpha: 1,
    },
    "start",
    "stageIn"
  )
  .to(
    openSource.split.chars,
    {
      yPercent: 0,
      opacity: 1,
      color: colors.white,
      stagger: {
        each: 0.02,
        ease: "power2.inOut",
        from: "start",
      },
      duration: 1.3,
      ease: "power4.inOut",
    },
    "start+=1",
    "text"
  )
  .to(
    openScience.split.chars,
    {
      yPercent: 0,
      opacity: 1,
      color: colors.ylw,
      stagger: {
        each: 0.02,
        ease: "power2.inOut",
        from: "start",
      },
      duration: 1.9,
      ease: "power4.inOut",
    },
    "start+=1.15"
  )
  .from(
    introPara.split.lines,
    {
      autoAlpha: 0,
      y: 12,
      rotateY: -8,
      color: colors.ylw,
      ease: "power2.out",
      stagger: 0.09,
      duration: 1.8,
    },
    "start+=1.5"
  )
  .from(
    navDots,
    {
      stagger: 0.1,
      scale: 0.64,
      duration: 0.66,
      autoAlpha: 0,
      ease: "back.out(1.3)",
    },
    "start+=.6"
  )
  .to(
    soundIndi,
    {
      opacity: 1,
      duration: 0.67,
    },
    "start+=.7"
  )
  .call(playScrollLottie, {}, "start+=1.5")
  .from(
    scrollIndiSplit.chars,
    {
      xPercent: 100,
      stagger: 0.02,
      duration: 1.4,
      ease: "power3.inOut",
    },
    "start+=.7"
  )

  .from(
    hamburgerContainer,
    {
      scaleX: 0,
      duration: 0.69,
      ease: "power3.inOut",
      delay: 0.18,
      transformOrigin: "5% center",
    },
    "<"
  )
  // .call(interstitialOneCreate)
  .to(html, {
    overflowY: "auto",
  });

function createIntroOutTL() {
  let introOutTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#introPanel",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      pinSpacing: false,
      pin: "#introPanel",
      paused: true,
      onComplete: function () {
        trigger();
      },
    },
  });

  introOutTL
    .to(
      openSource.split.chars,
      {
        z: -12,
        yPercent: -10,
        autoAlpha: 0,
        // filter: "blur(3px)",
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
        yPercent: 14,
        autoAlpha: 0,
        ease: "power3.inOut",
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
        color: colors.teal,
        rotateY: 3,
        ease: "power2.inOut",
        duration: 0.7,
        filter: "blur(4px)",
        stagger: 0.14,
      },
      "scrollingOut+=50%"
    )
    .to(
      container,
      {
        scaleY: 0,
        transformOrigin: "center bottom",
        duration: 0.75,
      },
      "scrollingOut+=70%"
    )
    .to(
      scrollIndiSplit.chars,
      {
        autoAlpha: 0,
        duration: 2,
        stagger: 0.02,
      },
      "scrollingOut+=71%"
    );
}

let interstitialOne = document.querySelector("#whatDoProteins");

function interstitialOneCreate() {
  let firstInterstitial = gsap.timeline({
    scrollTrigger: {
      start: "top center",
      end: "bottom top",
      trigger: interstitialOne,
      // pin: interstitialOne,
      toggleActions: "play pause pause restart",
    },
  });

  firstInterstitial
    .from(h4.split.words, {
      duration: 1.5,
      z: -33,
      autoAlpha: 0,
      ease: "power4.out",
      stagger: {
        from: "edges",
        each: 0.052,
      },
    })
    .to(h4.split.words, {
      autoAlpha: 0,
      delay: 2,
      z: -40,
      duration: 1,
      stagger: 0.052,
      filter: "blur(4px)",
    });
}

window.onload = () => {
  titleTL.play();
};
