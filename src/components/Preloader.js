import Component from "../classes/Component";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

export default class Preloader extends Component {
  constructor() {
    super({
      element: "#loader",
      elements: {
        images: "[data-src]",
        percentage: ".loaderNumber",
      },
    });
    this.length = 0;
  }

  create() {
    super.create();
    this.loadImages();
  }

  loadImages() {
    this.elements.images.forEach((img) => {
      img.onload = () => this.onAssetLoaded(img);
      img.src = img.getAttribute("data-src");
    });
  }

  onAssetLoaded(img) {
    this.length += 1;

    var percentLoaded = this.length / this.elements.images.length;
    this.elements.percentage.innerHTML = Math.round(percentLoaded * 100) + "%";

    if (percentLoaded == 1) {
      this.animateOut();
    }
  }

  animateOut() {
    return new Promise((resolve) => {
      const tl = gsap.timeline({
        delay: 0.4,
        onComplete: resolve,
      });
      this.elements.percentage.split = new SplitText(this.elements.percentage, {
        type: "lines, chars",
        linesClass: "splitLine",
      });

      tl.to(
        this.elements.percentage.split.chars,
        {
          yPercent: 100,
          ease: "power3.inOut",
          duration: 0.5,
          stagger: 0.052,
        },
        0
      )
        .to(
          this.element,
          {
            autoAlpha: 0,
            duration: 0.5,
          },
          1.85
        )
        .to(
          this.element,
          {
            display: "none",
          },
          2.1
        );
    });
  }

  soundAsk() {}
}
