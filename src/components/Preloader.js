import Component from "../classes/Component";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import SoundToggle from "./SoundToggle";

export default class Preloader extends Component {
  constructor() {
    super({
      element: "#loader",
      elements: {
        images: "[data-src]",
        percentage: ".loaderNumber",
        askContainer: ".soundAsk",
        askText: ".soundAsk h3",
        stage: "#viewport",
        soundAsk: ".soundAsk",
        soundButtons: "#soundButtons > button",
        soundOn: "#soundButtons > button.soundOnClick",
        soundOff: "#soundButtons > button.soundOffClick",
      },
    });
    this.length = 0;
  }

  create() {
    super.create();
    this.sound = new SoundToggle();
    this.addEventListeners();
    this.loadImages();
  }

  loadImages() {
    this.elements.images.forEach((img) => {
      img.onload = (_) => this.onAssetLoaded(img);
      img.src = img.getAttribute("data-src");
    });
  }

  onAssetLoaded(img) {
    this.length += 1;
    var percentLoaded = this.length / this.elements.images.length;
    this.elements.percentage.innerHTML = Math.round(percentLoaded * 100) + "%";

    if (percentLoaded == 1) {
      this.animateOutPercentage();
    }
  }

  animateOutPercentage() {
    const tl = gsap.timeline({
      delay: 0.4,
      onComplete: this.soundAsk(),
      // onComplete: resolve,
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
    );
  }

  soundAsk() {
    const split = new SplitText(this.elements.askText, {
      type: "lines, chars",
      linesClass: "splitLine",
    });

    const tl = gsap.timeline({
      delay: 1.2,
    });

    tl.to(
      this.elements.askContainer,
      {
        autoAlpha: 1,
        duration: 0.3,
      },
      0
    )
      .from(
        split.chars,
        {
          yPercent: 100,
          duration: 0.7,
          ease: "power2.inOut",
          stagger: 0.007,
        },
        0.2
      )
      .to(
        this.elements.soundButtons,
        {
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.2,
          ease: "none",
        },
        0.4
      );
  }

  addEventListeners() {
    var sound = false;

    this.elements.soundOn.addEventListener("click", (event) => {
      this.sound.toggleSound(true);
      sound = true;
      this.animateOut();
    });

    this.elements.soundOff.addEventListener("click", (event) => {
      this.sound.toggleSound(false);
      sound = false;
      this.animateOut();
    });
    let soundOnTargets = gsap.utils.toArray(
      ".soundOnClick:not(#soundButtons .soundOnClick)"
    );
    let soundOffTargets = gsap.utils.toArray(
      ".soundOffClick:not(#soundButtons .soundOffClick"
    );
    let soundToggleTargets = gsap.utils.toArray(".soundToggleClick");

    soundOnTargets.forEach((el) => {
      el.onclick = () => {
        this.sound.toggleSound(true);
        sound = true;
      };
    });

    soundToggleTargets.forEach((el) => {
      el.onclick = () => {
        this.sound.toggleSound(!sound);
        sound = !sound;
      };
    });

    soundOffTargets.forEach((el) => {
      el.onclick = () => {
        this.sound.toggleSound(false);
        sound = false;
      };
    });
  }

  animateOut() {
    const tl = gsap.timeline({
      onComplete: () => {},
    });

    tl.to(
      this.element,
      {
        backgroundImage:
          "radial-gradient(circle, rgba(0,19,48,.01) 60%, rgba(3,11,24,1) 100%)",
        duration: 2,
        ease: "power3.in",
      },
      0
    )
      .to(
        this.elements.soundAsk,
        {
          autoAlpha: 0,
          duration: 0.5,
        },
        0
      )
      .call(
        () => {
          this.emit("completed");
        },
        null,
        0.8
      )
      .to(
        this.element,
        {
          autoAlpha: 0,
          duration: 0.25,
        },
        2
      );
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
