import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import Draggable from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";
import Lottie from "lottie-web";
import CustomEase from "gsap/src/CustomEase";
import colors from "./colors";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import soundDangerReverse from "./soundToggle";

gsap.registerPlugin(
  ScrollTrigger,
  Draggable,
  SplitText,
  CustomEase,
  InertiaPlugin,
  DrawSVGPlugin
);

let nglStage = document.querySelector("#viewport");

document.addEventListener("DOMContentLoaded", (event) => {
  let peptideLottieContainer = document.getElementById(
    "peptideLottieContainer"
  );

  let firstText = document.querySelector(
    "#whatIsFoldingText > div:first-child"
  );
  let firstHead = firstText.querySelector("h2");
  let firstPara = firstText.querySelector("p");
  let secondText = document.querySelector(
    "#whatIsFoldingText > div:last-child"
  );
  // let secondHead = secondText.querySelector("h2");
  // let secondPara = secondText.querySelector("p");
  let html = document.querySelector("html");
  let whatIsFolding = document.getElementById("whatIsFolding");

  let firstTextAnim = gsap.timeline({
    scrollTrigger: {
      trigger: whatIsFolding,
      start: "top bottom+=22%",
    },
  });

  firstHead.split = new SplitText(firstHead, {
    type: "words, lines",
    linesClass: "splitLine",
  });
  firstPara.split = new SplitText(firstPara, {
    type: "lines",
  });

  firstTextAnim
    .from(
      firstHead.split.words,
      {
        yPercent: 30,
        autoAlpha: 0,
        duration: 1,
        ease: "power4.inOut",
        stagger: 0.0142,
      },
      "start"
    )
    .from(
      firstPara.split.lines,
      {
        autoAlpha: 0,
        y: 55,
        delay: 0.25,
        rotateY: -8,
        ease: "power2.out",
        stagger: 0.09,
        duration: 0.9,
      },
      "start"
    );

  var peptideAnim = Lottie.loadAnimation({
    container: peptideLottieContainer,
    renderer: "svg",
    loop: false,
    quality: "low",
    autoplay: false,
    path: "https://assets10.lottiefiles.com/packages/lf20_c5t9h6bj.json",
  });

  var frameSegments = [
    [0, 1],
    [1, 130],
    [130, 240],
  ];

  let dangerClearTL = gsap.timeline({
    paused: true,
  });

  dangerClearTL
    .to(html, {
      overflowY: "auto",
    })
    .to(nglStage, {
      filter: "blur(4px) saturate(1)",
      duration: 3,
    });

  peptideAnim.addEventListener("DOMLoaded", (event) => {
    peptideAnim.playSegments(frameSegments[0]);

    let dangerClickTargets = gsap.utils.toArray(".errorTarget");

    dangerTL
      // Arrives at danger state
      .to(peptideLottieContainer, {
        filter: "blur(0px)",
        autoAlpha: 1,
        duration: 0.5,
      })
      .to(
        secondText,
        {
          autoAlpha: 1,
          duration: 0.45,
        },
        "swap",
        ">"
      )
      .to(
        firstText,
        {
          autoAlpha: 0,
          duration: 0.45,
        },
        "swap"
      )
      .to(dangerClickTargets, {
        autoAlpha: 1,
        delay: 1,
        duration: 0.6,
        stagger: 0.2,
      })
      .call(flickerTL.play, null, "swap")
      .to(dangerSeriesTrigger, {
        autoAlpha: 0,
        duration: 0.4,
      });

    dangerClickTargets.forEach((target) => {
      var dangerMarkerAnim = Lottie.loadAnimation({
        container: target,
        renderer: "svg",
        loop: true,
        quality: "medium",
        autoplay: true,
        path: "https://assets4.lottiefiles.com/packages/lf20_f401ldqi.json",
      });

      target.addEventListener("click", (event) => {
        dangerClickClear += 1;
        if (dangerClickClear === 3) {
          soundDangerReverse;
          peptideAnim.playSegments([2, 131]);
          dangerClearTL.play();
        }

        console.log(dangerClickClear);
      });
    });
  });

  let dragDirections = document.getElementById("dragDirections");
  dragDirections.split = new SplitText(dragDirections, {
    type: "words, lines",
    linesClass: "splitLine",
  });

  gsap.set(secondText, {
    autoAlpha: 0,
  });

  gsap.set(peptideLottieContainer, {
    filter: "blur(3.5px)",
  });

  let dangerSeriesTrigger = document.getElementById("peptideSliderContainer");

  let dangerTL = gsap.timeline({
    paused: true,
  });

  let flickerTL = gsap.timeline({
    paused: true,
  });

  flickerTL.yoyo(true);
  flickerTL.repeat(-1);

  flickerTL
    .to(nglStage, {
      filter: "blur(10px) saturate(1.3) brightness(.93)",
      ease: "rough({ strength: 1, points: 12, template: none.in, taper: none, randomize: true, clamp: true })",
      duration: 3,
    })
    .to(nglStage, {
      filter: "blur(9px) saturate(1.2) brightness(.85)",
      ease: "rough({ strength: 1, points: 12, template: none.in, taper: none, randomize: true, clamp: true })",
      duration: 4.2,
    });

  let draggerTL = gsap.timeline({
    paused: true,
  });

  let knob = document.getElementById("peptideKnob");
  let sliderCirclePath = document.querySelector("#sliderCircle > circle");

  // On drag complete, this plays
  draggerTL
    .to(
      sliderCirclePath,
      {
        drawSVG: "0%",
        duration: 0.5,
        ease: "power2.inOut",
      },
      "start"
    )
    .to(
      knob,
      {
        scale: 0.4,
        duration: 0.31,
        ease: CustomEase.create(
          "custom",
          "M0,0 C0,0 0.056,-0.002 0.09,-0.011 0.174,-0.034 0.201,-0.079 0.286,-0.102 0.325,-0.112 0.385,-0.15 0.45,-0.132 0.6,-0.088 0.696,-0.148 0.91,0.626 0.949,0.771 1,1 1,1 "
        ),
        autoAlpha: 0,
        filter: "blur(4px)",
      },
      "start+=.37"
    )
    .to(
      dragDirections.split.words,
      {
        yPercent: 100,
        stagger: 0.05,
        duration: 0.7,
        ease: "power3.inOut",
      },
      "start"
    );

  function createPeptideDraggable() {
    Draggable.create("#peptideSlider", {
      inertia: true,
      type: "rotation",
      trigger: knob,
      bounds: { maxRotation: 360, minRotation: 0 },
      onThrowComplete: function () {
        if (this.rotation === 360) {
          draggerTL.play();
          dangerTL.play();
          peptideAnim.playSegments(frameSegments[1]);
        }
      },
      onPress: function () {
        gsap.to(knob, {
          scale: 1.4,
          color: colors.white,
        });
      },
      onRelease: function () {
        gsap.to(knob, {
          scale: 1,
          background: colors.ylw,
        });
      },
    });
  }
  // Fires and creates intro anim for peptide area
  function createPeptideTL() {
    let peptideTL = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: whatIsFolding,
        start: "top top",
        end: "bottom top",
      },
    });
    peptideTL
      // .call(peptideTL.scrollTrigger.refresh())
      .to(nglStage, {
        filter: "saturate(.5) blur(7.5px)",
        duration: 0.9,
      })
      .fromTo(
        peptideLottieContainer,
        { autoAlpha: 0, filter: "blur(0px)" },
        { autoAlpha: 0.4, duration: 0.56, filter: "blur(8px)" },
        "draggerIn"
      )
      .from(
        sliderCirclePath,
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.74, ease: "power3.inOut" },
        "draggerIn"
      )
      .from(
        knob,
        {
          scale: 0,
          duration: 0.33,
          delay: 0.09,
          ease: "back.out(1.3)",
        },
        ">"
      )
      .fromTo(
        dragDirections.split.words,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.57, stagger: 0.05, ease: "power3.inOut" },
        "draggerIn"
      )
      .call(function () {
        firstTextAnim.play();
      })
      .call(createPeptideDraggable);
  }

  peptideAnim.addEventListener("DOMLoaded", (event) => {
    createPeptideTL();
  });

  // Danger Click Targets
  var dangerClickClear = 0;
});
