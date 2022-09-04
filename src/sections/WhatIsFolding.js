import Component from "../classes/Component";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import SplitText from "gsap/SplitText";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import Lottie from "lottie-web";
import CustomEase from "gsap/CustomEase";
import { colors } from "../data";

export default class WhatIsFolding extends Component {
  constructor() {
    super({
      element: "html",
      elements: {
        knob: "#peptideKnob",
        sliderCirclePath: "#sliderCircle > circle",
        peptideLottieContainer: "#peptideLottieContainer",
        dragDirections: "#dragDirections",
        dangerSeriesTrigger: "#peptideSliderContainer",
        nglStage: "#viewport",
        firstText: "#whatIsFoldingText > div:first-child",
        firstHead: "#whatIsFoldingText > div:first-child h2",
        firstPara: "#whatIsFoldingText > div:first-child p",
        secondText: "#whatIsFoldingText > div:last-child",
        secondHead: "#whatIsFoldingText > div:last-child h2",
        secondPara: "#whatIsFoldingText > div:last-child p",
        harvardLink: "#whatIsFolding cite",
      },
    });
  }

  // let flickerTL = gsap.timeline({
  //   paused: true,
  // });

  // flickerTL.yoyo(true);
  // flickerTL.repeat(-1);

  // flickerTL
  //   .to(nglStage, {
  //     filter: "blur(10px) saturate(1.3) brightness(.93)",
  //     ease: "rough({ strength: 1, points: 12, template: none.in, taper: none, randomize: true, clamp: true })",
  //     duration: 3,
  //   })
  //   .to(nglStage, {
  //     filter: "blur(9px) saturate(1.2) brightness(.85)",
  //     ease: "rough({ strength: 1, points: 12, template: none.in, taper: none, randomize: true, clamp: true })",
  //     duration: 4.2,
  //   });

  create() {
    super.create();
    this.createSplits();
    this.createPeptideAnimation();
    this.createFoldingPeptideTimeline();
    this.createPeptideDraggable();
  }

  createSplits() {
    this.elements.firstHead.split = new SplitText(this.elements.firstHead, {
      type: "words, lines",
      linesClass: "splitLine",
    });
    this.elements.firstPara.split = new SplitText(this.elements.firstPara, {
      type: "lines",
    });
    this.elements.secondHead.split = new SplitText(this.elements.secondHead, {
      type: "words, lines",
      linesClass: "splitLine",
    });
    this.elements.secondPara.split = new SplitText(this.elements.secondPara, {
      type: "lines",
    });

    this.elements.dragDirections.split = new SplitText(
      this.elements.dragDirections,
      {
        type: "words, lines",
        linesClass: "splitLine",
      }
    );
  }

  createDangerMarkers() {
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

    let dangerTL = gsap.timeline();

    // Slice array into pieces that match the sections that change color
    let errorGroups = [
      errorDots.slice(0, 5),
      errorDots.slice(5, 10),
      errorDots.slice(10, 16),
    ];

    let dangerClearTL = gsap.timeline({
      paused: true,
      onComplete: () => {
        dangerClearTL.kill();
      },
    });

    dangerClearTL
      .to("html", {
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
      .to(this.elements.nglStage, {
        filter:
          "blur(4px) saturate(.7) hue-rotate(0deg) contrast(1) brightness(1)",
        duration: 0.25,
      });

    dangerTL
      // Arrives at danger state
      .to(this.elements.peptideLottieContainer, {
        filter: "blur(0px)",
        autoAlpha: 1,
        duration: 0.5,
      })
      .to(
        this.elements.firstHead.split.words,
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
        this.elements.firstPara.split.lines,
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
        this.elements.firstText.querySelector("h4"),
        {
          autoAlpha: 0,

          duration: 0.5,
        },
        "swap"
      )
      .from(
        this.elements.secondText.querySelector("h4"),
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
        this.elements.dangerSeriesTrigger,
        {
          autoAlpha: 0,
          duration: 0.4,
        },
        "state"
      )
      .from(
        this.elements.secondHead.split.words,
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
        this.elements.secondPara.split.lines,
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
        this.elements.harvardLink,
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
      target.dangerMarkerAnim = Lottie.loadAnimation({
        container: target,
        renderer: "svg",
        loop: true,
        quality: "medium",
        autoplay: true,
        path: "https://assets10.lottiefiles.com/packages/lf20_oafsmzxp.json",
      });

      target.addEventListener("click", (event) => {
        let e = dangerClickTargets.indexOf(target);
        dangerClickClear += 1;
        gsap.to(target, {
          autoAlpha: 0,
          duration: 0.6,
          ease: "back.out(5)",
          onComplete: () => {
            target.dangerMarkerAnim.destroy();
          },
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
  }

  createPeptideAnimation() {
    if (!peptideAnim) {
      var peptideAnim = Lottie.loadAnimation({
        container: this.elements.peptideLottieContainer,
        renderer: "svg",
        loop: false,
        quality: "low",
        autoplay: false,
        path: "https://assets2.lottiefiles.com/packages/lf20_dwwvpyiy.json",
      });

      console.log(peptideAnim);

      var frameSegments = [
        [0, 1],
        [1, 130],
        [130, 240],
      ];
      peptideAnim.addEventListener("DOMLoaded", (event) => {
        peptideAnim.playSegments(frameSegments[0]);
        // this.createDangerMarkers();
      });
    }
  }

  dragCompleteAnimation() {
    let draggerTL = gsap.timeline({
      paused: true,
      onComplete: () => {
        draggerTL.kill();
      },
    });

    draggerTL
      .to(
        this.elements.sliderCirclePath,
        {
          drawSVG: "0%",
          duration: 0.5,
          ease: "power2.inOut",
        },
        "start"
      )
      .to(
        this.elements.knob,
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
        this.elements.dragDirections.split.words,
        {
          yPercent: 100,
          stagger: 0.05,
          duration: 0.7,
          ease: "power3.inOut",
        },
        "start"
      );
  }

  createFoldingPeptideTimeline() {
    let peptideTL = gsap.timeline({
      scrollTrigger: {
        trigger: whatIsFolding,
        start: "top top+=18%",
        end: "bottom top",
      },
      onComplete: () => {
        peptideTL.kill();
      },
    });

    let peptideAnimInTL = gsap.timeline({
      scrollTrigger: {
        trigger: whatIsFolding,
        start: "top top",
      },
      onComplete: () => {
        peptideAnimInTL.kill();
      },
    });

    peptideAnimInTL
      .from(
        this.elements.firstHead.split.words,
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
        this.elements.firstPara.split.lines,
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
        this.elements.nglStage,
        {
          filter: "saturate(.3) blur(7.5px)",
          duration: 0.9,
          delay: 0.5,
        },
        "start"
      )
      .fromTo(
        this.elements.peptideLottieContainer,
        { autoAlpha: 0, filter: "blur(0px)" },
        { autoAlpha: 0.4, duration: 0.56, filter: "blur(8px)" },
        0.7
      )
      .from(
        this.elements.knob,
        {
          scale: 0,
          duration: 0.33,
          ease: "back.out(1.3)",
        },
        0.7
      )
      .from(
        this.elements.sliderCirclePath,
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.74, ease: "power3.inOut" },
        1
      )
      .fromTo(
        this.elements.dragDirections.split.words,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.57, stagger: 0.05, ease: "power3.inOut" },
        0.7
      );
  }

  createPeptideDraggable() {
    var drag = Draggable.create("#peptideSlider", {
      inertia: true,
      type: "rotation",
      trigger: this.elements.knob,
      bounds: { maxRotation: 360, minRotation: 0 },
    })[0];

    drag.addEventListener("throwcomplete", () => {
      if (drag.rotation == 360) {
        // handleAudioSwitch();
        this.dragCompleteAnimation();
        this.createDangerMarkers();
        peptideAnim.playSegments(frameSegments[1]);
        drag.kill();
        setTimeout(() => {
          gsap.to(this.elements.nglStage, {
            filter:
              "blur(7.5px) saturate(.8) hue-rotate(135deg) brightness(.7) contrast(1.25)",
            duration: 0.25,
          });
        }, 2000);
      }
    });

    drag.addEventListener("press", () => {
      gsap.to(this.elements.knob, {
        scale: 1.4,
        color: colors.white,
      });
    });

    drag.addEventListener("release", () => {
      gsap.to(this.elements.knob, {
        scale: 1,
        background: colors.ylw,
      });
    });
  }
}
