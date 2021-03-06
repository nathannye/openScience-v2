import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import Draggable from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";
import Lottie from "lottie-web";
import CustomEase from "gsap/src/CustomEase";
import colors from "./colors";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import { handleAudioSwitch } from "./soundToggle";
import { TetrahedronGeometry } from "three";

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

  let secondHead = secondText.querySelector("h2");
  let secondPara = secondText.querySelector("p");
  let harvardLink = secondText.querySelector("cite");
  let html = document.querySelector("html");
  let whatIsFolding = document.getElementById("whatIsFolding");

  let firstTextAnim = gsap.timeline({
    scrollTrigger: {
      trigger: whatIsFolding,
      start: "top top+=12%",
    },
  });

  firstHead.split = new SplitText(firstHead, {
    type: "words, lines",
    linesClass: "splitLine",
  });
  firstPara.split = new SplitText(firstPara, {
    type: "lines",
  });
  secondHead.split = new SplitText(secondHead, {
    type: "words, lines",
    linesClass: "splitLine",
  });
  secondPara.split = new SplitText(secondPara, {
    type: "lines",
  });

  var peptideAnim = Lottie.loadAnimation({
    container: peptideLottieContainer,
    renderer: "svg",
    loop: false,
    quality: "low",
    autoplay: false,
    path: "https://assets2.lottiefiles.com/packages/lf20_dwwvpyiy.json",
  });

  var frameSegments = [
    [0, 1],
    [1, 130],
    [130, 240],
  ];
  // Wait for Lottie to load before appending to/editing it
  peptideAnim.addEventListener("DOMLoaded", (event) => {
    peptideAnim.playSegments(frameSegments[0]);

    let dangerClickTargets = gsap.utils.toArray(".errorTarget");

    let chain = document.querySelector("#yellowChainBase > path");
    let dots = gsap.utils.toArray(
      ".aminoMarker:not(.isError) > path:nth-child(2)"
    );
    let errorDots = gsap.utils.toArray(
      ".aminoMarker.isError > path:nth-child(2)"
    );
    let redChains = gsap.utils.toArray(
      "#firstRedChain > path, #middleRedChain > path, #lastRedChain > path"
    );
    // Slice array into pieces that match the sections that change color
    let errorGroups = [
      errorDots.slice(0, 5),
      errorDots.slice(5, 10),
      errorDots.slice(10, 16),
    ];

    let dangerClearTL = gsap.timeline({
      paused: true,
    });

    dangerClearTL
      .to(html, {
        overflowY: "auto",
      })
      .to(
        dots,
        {
          stroke: colors.ylw,
          duration: 0.7,
        },
        "revertColors"
      )
      .to(
        chain,
        {
          stroke: colors.ylw,
          duration: 0.7,
        },
        "revertColors"
      )
      .to(nglStage, {
        filter:
          "blur(4px) saturate(.7) hue-rotate(0deg) contrast(1) brightness(1)",
        duration: 0.25,
      });

    dangerTL
      // Arrives at danger state
      .to(peptideLottieContainer, {
        filter: "blur(0px)",
        autoAlpha: 1,
        duration: 0.5,
      })
      .to(
        firstHead.split.words,
        {
          yPercent: 100,
          duration: 1,
          ease: "power4.inOut",
          stagger: 0.0142,
        },
        "swap",
        ">"
      )
      .to(
        firstPara.split.lines,
        {
          z: -2,
          y: 9,
          autoAlpha: 0,
          color: colors.teal,
          rotateY: 5,
          ease: "power2.inOut",
          duration: 0.7,
          stagger: 0.14,
        },
        "swap"
      )
      .to(
        firstText.querySelector("h4"),
        {
          autoAlpha: 0,

          duration: 0.5,
        },
        "swap"
      )
      .from(
        secondText.querySelector("h4"),
        {
          autoAlpha: 0,
          duration: 0.5,
          delay: 1,
        },
        "swap"
      )
      .to(
        chain,
        {
          stroke: colors.blue,
          duration: 0.6,
          delay: 0.8,
        },
        "<"
      )
      .to(
        dots,
        {
          stroke: colors.blue,
          duration: 0.6,
        },
        "<",
        "state"
      )
      .to(
        dangerSeriesTrigger,
        {
          autoAlpha: 0,
          duration: 0.4,
        },
        "state"
      )

      .from(
        secondHead.split.words,
        {
          yPercent: 100,
          duration: 1,
          ease: "power4.inOut",
          stagger: 0.0142,
          delay: 0.5,
        },
        "swap"
      )
      .from(
        secondPara.split.lines,
        {
          autoAlpha: 0,
          y: 12,
          rotateY: -8,
          color: colors.teal,
          stagger: 0.09,
          duration: 1.5,
          ease: "power2.inOut",
          delay: 0.75,
        },
        "swap"
      )
      .from(
        harvardLink,
        {
          autoAlpha: 0,
          duration: 0.45,
        },
        ">"
      )
      .from(
        dangerClickTargets,
        {
          autoAlpha: 0,
          delay: 1.35,
          duration: 0.6,
          filter: "blur(2.5px)",
          stagger: {
            each: 0.2,
            from: "end",
          },
        },
        "swap+=.4",
        "state"
      );

    dangerClickTargets.forEach((target) => {
      var dangerMarkerAnim = Lottie.loadAnimation({
        container: target,
        renderer: "svg",
        loop: true,
        quality: "medium",
        autoplay: true,
        path: "https://assets10.lottiefiles.com/packages/lf20_oafsmzxp.json",
      });

      console.log(dangerMarkerAnim);

      target.addEventListener("click", (event) => {
        let e = dangerClickTargets.indexOf(target);
        dangerClickClear += 1;
        gsap.to(target, {
          autoAlpha: 0,
          duration: 0.6,
          ease: "back.out(5)",
        });

        gsap.to(errorGroups[e], {
          stroke: colors.ylw,
        });
        gsap.to(redChains[e], {
          stroke: colors.ylw,
        });

        if (dangerClickClear === 3) {
          handleAudioSwitch();
          peptideAnim.playSegments([130, 240]);
          dangerClearTL.play();
        }
      });
    });
  });

  let dragDirections = document.getElementById("dragDirections");
  dragDirections.split = new SplitText(dragDirections, {
    type: "words, lines",
    linesClass: "splitLine",
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
        if (this.rotation == 360) {
          handleAudioSwitch();
          draggerTL.play();
          dangerTL.play();
          peptideAnim.playSegments(frameSegments[1]);
          setTimeout(() => {
            gsap.to(nglStage, {
              filter:
                "blur(7.5px) saturate(.8) hue-rotate(135deg) brightness(.7) contrast(1.25)",
              duration: 0.25,
            });
          }, 2000);
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
        start: "top top+=18%",
        end: "bottom top",
      },
    });
    peptideTL;
  }

  peptideAnim.addEventListener("DOMLoaded", (event) => {
    createPeptideTL();
  });

  // Danger Click Targets
  var dangerClickClear = 0;

  let peptideAnimInTL = gsap.timeline({
    scrollTrigger: {
      trigger: whatIsFolding,
      start: "top top",
    },
  });

  peptideAnimInTL
    .to(html, {
      // overflowY: "hidden",
    })
    .call(createPeptideDraggable)
    .from(
      firstHead.split.words,
      {
        yPercent: 100,
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
    )
    .to(
      nglStage,
      {
        filter: "saturate(.3) blur(7.5px)",
        duration: 0.9,
        delay: 0.5,
      },
      "start"
    )
    .fromTo(
      peptideLottieContainer,
      { autoAlpha: 0, filter: "blur(0px)" },
      { autoAlpha: 0.4, duration: 0.56, filter: "blur(8px)" },
      0.7
    )
    .from(
      knob,
      {
        scale: 0,
        duration: 0.33,
        ease: "back.out(1.3)",
      },
      0.7
    )
    .from(
      sliderCirclePath,
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 0.74, ease: "power3.inOut" },
      1
    )
    .fromTo(
      dragDirections.split.words,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.57, stagger: 0.05, ease: "power3.inOut" },
      0.7
    );

  // .call(function () {
  //   firstTextAnim.play();
  // })
});
