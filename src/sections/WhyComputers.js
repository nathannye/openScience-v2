import gsap from "gsap";
import Component from "../classes/Component";
import SplitText from "gsap/SplitText";
import Lottie from "lottie-web";

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
  }

  create() {
    super.create();
    this.needtl = gsap.timeline({
      scrollTrigger: {
        trigger: this.element,
        start: "top top",
        pin: true,
        end: "bottom top",
        scrub: 0.9,
      },
    });
    this.paths = ["#firstPath", "#secondPath", "#thirdPath", "#fourthPath"];

    this.aminoProps = [
      {
        p: "#firstPath",
        dur: 15,
        start: 0.35,
        end: 1.5,
      },
      {
        p: "#secondPath",
        dur: 25,
        start: 0.9,
        end: 2.2,
      },
      {
        p: "#thirdPath",
        dur: 19,
        start: 1,
        end: 2.1,
      },
      {
        p: "#fourthPath",
        dur: 24,
        start: 0,
        end: 0.4,
      },
    ];
    this.createAminos();
    this.createContainerAnimation();
  }

  createContainerAnimation() {
    this.elements.numbers.split = new SplitText(this.elements.numbers, {
      type: "chars, lines",
    });

    this.elements.h2.split = new SplitText(this.elements.h2, {
      type: "words, lines",
      linesClass: "splitLine",
    });
    this.elements.para.split = new SplitText(this.elements.para, {
      type: "lines",
    });

    this.needtl
      .from(
        this.elements.h4,
        {
          x: -10,
          autoAlpha: 0,
          duration: 1.2,
          ease: "power3.inOut",
        },
        0
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
        0
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
        0
      );

    this.elements.numbers.split.chars.forEach((c, index) => {
      if (index % 2 == 0) {
        c.tween = gsap.from(
          c,
          {
            yPercent: 20,
            autoAlpha: 0,
            duration: 10,
            ease: "power2.out",
            delay: index / 10,
          },
          1
        );
      } else {
        c.tween = gsap.from(
          c,
          {
            yPercent: -20,
            autoAlpha: 0,
            duration: 10,
            ease: "power2.out",
            delay: index / 10,
          },
          1
        );
      }
      this.needtl.add(c.tween);
    });
  }

  createAminos() {
    for (let i = 0; i < this.aminoProps.length; i++) {
      let dude = Lottie.loadAnimation({
        container: this.elements.aminoContainer.item(i),
        path: "https://assets5.lottiefiles.com/packages/lf20_cpwcuygx.json",
        autoplay: true,
        quality: "low",
        loop: true,
      });

      dude.setSpeed(1.3);

      dude.addEventListener("DOMLoaded", (event) => {
        let anim = gsap.timeline();
        let d = this.elements.aminoContainer.item(i);
        anim
          .to(
            d,
            {
              opacity: 1,
              duration: 1,
            },
            "main"
          )
          .to(
            d,
            {
              duration: this.aminoProps[i].dur * 2.25,
              motionPath: {
                start: this.aminoProps[i].start,
                end: this.aminoProps[i].end,
                path: this.paths[i],
                align: this.paths[i],
                autoRotate: true,
              },
            },
            "main"
          )
          .to(
            d,
            {
              opacity: 0,
              duration: 6,
            },
            ">"
          );
        this.needtl.add(anim, 1);
      });
    }
  }

  createBackerAnimation() {}
}
