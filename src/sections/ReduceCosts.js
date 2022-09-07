import Component from "../classes/Component";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";

export default class ReduceCosts extends Component {
  constructor() {
    super({
      element: "#helpingReduceCosts",
      elements: {
        twoThouFlip: "#twoThou .numberFlipperContainer > div",
        fiveThouFlip: "#fiveThou .numberFlipperContainer > div",
        crossOuts: ".crossOut",
        twoThouChars: "#twoThou .commaChar, #twoThou .dollarChar",
        fiveThouChars: "#fiveThou .commaChar, #fiveThou .dollarChar",
      },
    });
  }

  create() {
    super.create();
    this.createNumberFlippingAnimation();
  }

  createNumberFlippingAnimation() {
    let numbersFlipping = gsap.timeline({
      scrollTrigger: {
        trigger: this.element,
        start: "top bottom-=44%",
        markers: true,
      },
    });
    gsap.set([this.elements.twoThouFlip, this.elements.fiveThouFlip], {
      autoAlpha: 0,
    });

    numbersFlipping
      .to(
        this.elements.fiveThouFlip,
        {
          yPercent: -75,
          duration: 1.4,
          autoAlpha: 1,

          ease: "power3.inOut",
          stagger: {
            each: ".07",
            ease: "power3.inOut",
          },
        },
        "start"
      )
      .from(
        this.elements.fiveThouChars,
        {
          autoAlpha: 0,
          stagger: 0.04,
        },
        "start"
      )
      .to(
        this.elements.twoThouFlip,
        {
          yPercent: -75,
          autoAlpha: 1,

          duration: 1.4,
          ease: "power3.inOut",
          stagger: {
            each: 0.07,
            ease: "power3.inOut",
          },
        },
        "start+=.28"
      )
      .from(
        this.elements.twoThouChars,
        {
          autoAlpha: 0,
          stagger: 0.02,
        },
        "start+=.15"
      )
      .from(
        this.elements.crossOuts,
        {
          scaleX: 0,
          transformOrigin: "left center",
          ease: "power3.inOut",
          duration: 0.48,
          stagger: 0.12,
        },
        ">+=.54",
        "crossOut"
      )
      .to(
        [
          this.elements.fiveThouChars,
          this.elements.fiveThouFlip,
          this.elements.twoThouChars,
          this.elements.twoThouFlip,
        ],
        {
          opacity: 0.4,
          duration: 0.32,
          stagger: 0.01,
        },
        "crossOut-=.24"
      );
  }
}
