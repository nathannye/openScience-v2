import Component from "../classes/Component";
import gsap from "gsap";

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
    this.elements.percentage.innerHTML = Math.round(percentLoaded * 100);

    if (percentLoaded == 1) {
      this.animateOut;
    }
  }

  animateOut() {
    const tl = gsap.timeline();
  }
}
