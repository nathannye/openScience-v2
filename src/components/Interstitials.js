import Component from "../classes/Component";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

export default class Interstitial extends Component {
  constructor() {
    super({
      elements: {
        interstitials: ".panel.interstitial",
      },
    });
  }

  create() {
    super.create();
    this.createInterstitials();
  }

  createInterstitials() {
    this.elements.interstitials.forEach((e) => {
      e.split = new SplitText(e.querySelector("h4"), {
        type: "lines, words",
        linesClass: "splitLine",
      });

      e.tl = gsap.timeline({
        scrollTrigger: {
          trigger: e,
          // pin: true,
          start: "top top",
          end: "bottom 25%",
          toggleActions: "play reverse play play",
        },
      });

      e.tl.from(e.split.words, {
        yPercent: 100,
        autoAlpha: 1,
        duration: 0.55,
        ease: "power3.inOut",
        stagger: 0.03,
      });
    });
  }
}
