import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import colors from "./colors";
import navDots from "./navMarkerAnim";
import Lottie from "lottie-web";

gsap.registerPlugin(ScrollTrigger, SplitText);

let soundIndi = document.querySelector("div#soundIndicatorContainer");
let hamburgerContainer = document.getElementById("hamburgerIcon");
let indiContainer = document.getElementById("scrollAnimContainer");
let nglStage = document.querySelector("#viewport");
let html = document.querySelector("html");
let scrollIndiText = document.querySelector("#scrollIndicator h4");
let scrollIndiSplit = new SplitText(scrollIndiText, {
  type: "lines, chars",
  linesClass: "splitLine",
});

gsap.set(html, {
  overflowY: "hidden",
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

export default function setupIntroTL() {
  let titleTL = gsap.timeline({
    paused: true,
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
    .to(
      introPanel,
      {
        autoAlpha: 1,
        duration: 0.01,
      },
      "start"
    )
    .fromTo(
      nglStage,
      { filter: "saturate(0) blur(13px)", autoAlpha: 0 },
      {
        filter: "saturate(.68) blur(1px)",
        duration: 3.5,
        delay: 0.3,
        autoAlpha: 1,
      },
      "start",
      "stageIn"
    )
    .from(
      soundIndi,
      {
        autoAlpha: 0,
        duration: 0.8,
        scaleY: 0.7,
      },
      0.8
    )
    .from(
      navDots,
      {
        x: 10,
        stagger: 0.09,
        scale: 0.64,
        duration: 0.96,
        autoAlpha: 0,
        ease: "power3.inOut",
      },
      1.3
    )
    .call(
      function () {
        let scrollIndi = Lottie.loadAnimation({
          container: indiContainer,
          loop: false,
          renderer: "svg",
          quality: "low",
          autoplay: true,
          path: "https://assets6.lottiefiles.com/packages/lf20_t5abavzf.json",
        });

        scrollIndi.setSpeed(1.35);
      },
      null,
      "stageIn",
      1
    )
    .from(
      scrollIndiSplit.chars,
      {
        xPercent: 100,
        stagger: 0.02,
        duration: 1,
        ease: "power3.inOut",
      },
      "scrollIndi",
      1
    )
    .from(
      hamburgerContainer,
      {
        scaleX: 0,
        duration: 0.4,
        ease: "power3.inOut",
        delay: 0.18,
        transformOrigin: "5% center",
      },
      "start"
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
        duration: 1.2,
        ease: "power4.inOut",
      },
      0.2
    )
    .to(
      openScience.split.chars,
      {
        yPercent: 0,
        opacity: 1,
        delay: 0.25,
        color: colors.ylw,
        stagger: {
          each: 0.02,
          ease: "power2.inOut",
          from: "start",
        },
        duration: 1.6,
        ease: "power4.inOut",
      },
      0.2
    )
    .from(
      introPara.split.lines,
      {
        autoAlpha: 0,
        y: 12,
        rotateY: -8,
        delay: 0.5,
        color: colors.teal,
        ease: "power2.out",
        stagger: 0.09,
        duration: 1.5,
      },
      0.35
    );

  titleTL.play();
}
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
      indiContainer,
      {
        scaleY: 0,
        transformOrigin: "center bottom",
        duration: 0.75,
      },
      "scrollingOut+=70%",
      "indi"
    )
    .to(
      scrollIndiSplit.chars,
      {
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.09,
      },
      "scrollingOut+=70%",
      "indi"
    );
  ScrollTrigger.refresh();
  // Only give scrolling back AFTER the outro timeline has been created, not after intro has fired
  gsap.to(html, {
    overflowY: "auto",
  });
}
