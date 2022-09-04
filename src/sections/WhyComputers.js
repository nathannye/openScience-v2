import gsap from "gsap";
import Component from "../classes/Component";

export default class WhyComputers extends Component {
  constructor() {
    super({
      element: "#whyDoWeNeed",
      elements: {
        grain: "#grain",
        soundIndi: "#soundIndicatorContainer",
        ngl: "#viewport canvas",
        aminoContainer: ".aminoDudeContainer",
        para: "#whyDoWeNeed p",
        h4: "#whyDoWeNeed h4",
        numbers: "#millionAcross",
        h2: "#whyDoWeNeed h2",
      },
    });
    super.create();
    this.containertl = gsap.timeline({
      scrollTrigger: {
        trigger: this.element,
        start: "top top+=2%",
      },
    });
  }

  createContainerAnimation() {
    this.elements.h2.split = new SplitText(this.elements.h2, {
      type: "words, lines",
      linesClass: "splitLine",
    });
    this.elements.p.split = new SplitText(this.elements.para, {
      type: "lines",
    });

    this.containertl
      .from(
        this.elements.h4,
        {
          x: -10,
          autoAlpha: 0,
          duration: 1.2,
          ease: "power3.inOut",
        },
        "go"
      )
      .from(
        this.elements.h2.split.words,
        {
          yPercent: 100,
          autoAlpha: 0,
          duration: 1,
          ease: "power4.inOut",
          stagger: 0.0142,
        },
        "go+=.35"
      )
      .from(
        this.elements.para.split.lines,
        {
          autoAlpha: 0,
          y: 15,
          delay: 0.6,
          rotateY: -8,
          ease: "power2.out",
          stagger: 0.09,
          duration: 0.9,
        },
        "go+=.65"
      );
  }

  createBackerAnimation() {}
}
