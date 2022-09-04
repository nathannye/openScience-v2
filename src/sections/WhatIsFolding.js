import Component from "../classes/Component";

export default class WhatIsFolding extends Component {
  constructor() {
    super({
      element: "",
      elements: {
        knob: "#peptideKnob",
        sliderCirclePath: "#sliderCircle > circle",
        peptideLottieContainer: "#peptideLottieContainer",
        dragDirections: "#dragDirections",
      },
    });
  }

  create() {
    super.create();
    this.createFoldingPeptideTimeline();
    this.createPeptideDraggable();
  }

  createDangerMarkers() {}

  createPeptideAnimation() {}

  dragCompleteAnimation() {
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
  }

  createFoldingPeptideTimeline() {
    let peptideTL = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: whatIsFolding,
        start: "top top+=18%",
        end: "bottom top",
      },
      onComplete: () => {
        peptideTL.kill();
      },
    });

    peptideAnimInTL
      .call(createPeptideDraggable, null, 0)
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
  }

  createPeptideDraggable() {
    Draggable.create("#peptideSlider", {
      inertia: true,
      type: "rotation",
      trigger: knob,
      bounds: { maxRotation: 360, minRotation: 0 },
      onThrowComplete: function () {
        if (this.rotation == 360) {
          handleAudioSwitch();
          this.dragCompleteAnimation();
          dangerTL.play();
          peptideAnim.playSegments(frameSegments[1]);
          Draggable.kill();
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
}
