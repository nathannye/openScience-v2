import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import colors from "./colors";
import { wave } from "./waveAnim";
import { ampSet, freqSet } from "./soundToggle";
import Lottie from "lottie-web";

gsap.registerPlugin(ScrollTrigger, SplitText);

window.onload = () => {
  let soundSwitchLabel = document.getElementById("soundLabelSwitch");
  let waveContainer = document.getElementById("soundIndicator");
  let hamburger = document.querySelectorAll("#hamburgerIcon > svg > g > g");
  let indiContainer = document.getElementById("scrollAnimContainer");
  let nglStage = document.querySelector("#viewport");
  let html = document.querySelector("html");
  let scrollIndiText = document.querySelector("#scrollIndicator h4");
  let navDots = gsap.utils.toArray(".navMarker");
  let scrollIndiSplit = new SplitText(scrollIndiText, {
    type: "lines, chars",
    linesClass: "splitLine",
  });

  gsap.set(html, {
    overflowY: "hidden",
  });

  gsap.to(scrollIndiText, {
    opacity: 1,
  });

  let introPara = document.querySelector("#introPanel p");
  introPara.tl = gsap.timeline({
    paused: true,
  });

  function setupIntroParaSplit() {
    introPara.split = new SplitText(introPara, {
      type: "lines",
    });

    introPara.tl.from(introPara.split.lines, {
      autoAlpha: 0,
      y: 12,
      rotateY: -8,
      delay: 0.34,
      color: colors.teal,
      ease: "power2.out",
      stagger: 0.09,
      duration: 1.1,
    });
  }

  setupIntroParaSplit();

  let titles = document.querySelectorAll("#introHeadingContainer h1");
  let openSource = titles[0];
  let openScience = titles[1];

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

  // export default function setupIntroTL() {
  let titleTL = gsap.timeline({
    paused: true,
    onComplete: () => {
      createIntroOutTL();
    },
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
    .to(
      openSource.split.chars,
      {
        yPercent: 0,
        opacity: 1,
        color: colors.white,
        stagger: {
          each: 0.035,
          ease: "power2.inOut",
          from: "start",
        },
        duration: 1.45,
        ease: "power3.out",
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
          each: 0.035,
          ease: "power2.inOut",
          from: "start",
        },
        duration: 1.7,
        ease: "power3.out",
      },
      0.2
    )
    .call(
      function () {
        introPara.tl.play();
      },
      null,
      "start"
    )
    .to(
      navDots,
      {
        x: 0,
        stagger: 0.14,
        duration: 0.86,
        autoAlpha: 1,
        ease: "power2.inOut",
      },
      0.4
    )
    .call(
      () => {
        navDots[0].classList.add("activeNav");
      },
      null,
      "start"
    )
    .call(
      function () {
        let scrollIndi = Lottie.loadAnimation(
          {
            container: indiContainer,
            loop: false,
            renderer: "svg",
            quality: "low",
            autoplay: true,
            path: "https://assets10.lottiefiles.com/packages/lf20_n5nf19df.json",
          },
          null,
          "start"
        );
        scrollIndi.setSpeed(1.15);
      },
      null,
      0.9
    )
    .from(
      hamburger,
      {
        scaleX: 0,
        stagger: -0.1,
        duration: 1.25,
        ease: "power4.inOut",
        transformOrigin: "left center",
      },
      0.8
    )
    .from(
      scrollIndiSplit.chars,
      {
        xPercent: 100,
        stagger: 0.05,
        duration: 1.1,
        ease: "power2.out",
      },
      0.9
    )
    .fromTo(
      waveContainer,
      {
        scaleX: 0,
        duration: 0.8,
        ease: "power4.inOut",
        transformOrigin: "left center",
      },
      { scaleX: 1, duration: 0.8, ease: "power4.inOut" },
      1.2
    )
    .to(
      wave,
      {
        amplitude: ampSet,
        duration: 1.25,
        ease: "none",
      },
      1.75
    )
    .to(
      wave,
      {
        frequency: freqSet,
        ease: "none",
        duration: 0.25,
      },
      ">"
    )
    .to(
      soundSwitchLabel,
      {
        opacity: 1,
        duration: 0.7,
      },
      1.95
    );

  titleTL.play();

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
      .call(() => {
        introPara.tl.kill;
        introPara.tl.invalidate;
        titleTL.invalidate;
        titleTL.kill;
      })
      .to(
        openSource.split.chars,
        {
          z: -12,
          yPercent: -10,
          autoAlpha: 0,
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
          autoAlpha: 0,
          color: colors.teal,
          rotateY: 10,
          ease: "power2.inOut",
          duration: 0.7,
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
};
