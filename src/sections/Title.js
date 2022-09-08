import Component from "../classes/Component";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import Wave from "../animations/Wave";
import Lottie from "lottie-web";
import { colors } from "../data";

export default class Title extends Component {
  constructor() {
    super({
      element: "#introHeadingContainer",
      elements: {
        ngl: "#viewport",
        navDots: ".navMarker",
        hamburger: "#hamburgerIcon > svg > g > g",
        scrollIndiText: "#scrollIndicator h4",
        waveContainer: "#soundIndicatorContainer",
        indiContainer: "#scrollAnimContainer",
        html: "html",
        introPara: "#introPanel p",
        introPanel: "#introPanel",
        soundSwitchLabel: "#soundLabelSwitch",
        title: "#introHeadingContainer h1",
        openSource: "#introHeadingContainer > h1",
        openScience: "#introHeadingContainer > div > h1",
      },
    });
  }

  create() {
    super.create();
    this.tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        this.createIntroOutAnim();
        console.log("intro done");
      },
    });
    this.createIntroAnim();
  }

  createIntroAnim() {
    this.elements.scrollIndiText.split = new SplitText(
      this.elements.scrollIndiText,
      {
        type: "lines, chars",
        linesClass: "splitLine",
      }
    );
    this.elements.introPara.split = new SplitText(this.elements.introPara, {
      type: "lines",
    });
    this.elements.openSource.split = new SplitText(this.elements.openSource, {
      type: "chars",
    });
    this.elements.openScience.split = new SplitText(this.elements.openScience, {
      type: "chars",
    });

    gsap.set(this.elements.openSource.split.chars, {
      opacity: 0,
      yPercent: 46,
      color: colors.teal,
    });
    gsap.set(this.elements.openScience.split.chars, {
      opacity: 0,
      yPercent: -46,
      color: colors.teal,
    });

    let scrollIndi = Lottie.loadAnimation({
      container: this.elements.indiContainer,
      loop: false,
      renderer: "svg",
      quality: "low",
      autoplay: false,
      path: "https://assets10.lottiefiles.com/packages/lf20_n5nf19df.json",
    });
    scrollIndi.setSpeed(1.15);

    this.tl
      .to(
        this.elements.introPanel,
        {
          autoAlpha: 1,
          duration: 0.01,
        },
        "start"
      )
      .fromTo(
        this.elements.ngl,
        { filter: "saturate(0) blur(13px)", autoAlpha: 0 },
        {
          filter: "saturate(.68) blur(1px)",
          duration: 2,
          delay: 0.3,
          autoAlpha: 1,
        },
        "start",
        "stageIn"
      )
      .to(
        this.elements.openSource.split.chars,
        {
          yPercent: 0,
          opacity: 1,
          color: "white",
          stagger: {
            each: 0.05,
            // ease: "power2.inOut",
            from: "start",
          },
          duration: 1.1,
          ease: "power3.out",
        },
        0.2
      )
      .to(
        this.elements.openScience.split.chars,
        {
          yPercent: 0,
          opacity: 1,
          delay: 0.25,
          color: colors.ylw,
          stagger: {
            each: 0.05,
            // ease: "power2.inOut",
            from: "start",
          },
          duration: 0.85,
          ease: "power3.out",
        },
        0.2
      )
      .from(
        this.elements.introPara.split.lines,
        {
          autoAlpha: 0,
          yPercent: 12,
          rotateY: -8,
          delay: 0.34,
          color: colors.teal,
          ease: "power2.out",
          stagger: 0.09,
          duration: 0.85,
        },
        0.4
      )
      .to(
        this.elements.navDots,
        {
          x: 0,
          stagger: 0.14,
          duration: 0.86,
          autoAlpha: 1,
          ease: "power2.inOut",
        },
        0.4
      )
      .call(
        () => {
          this.elements.navDots[0].classList.add("activeNav");
        },
        null,
        "start"
      )
      .call(
        () => {
          scrollIndi.play();
        },
        null,
        0.9
      )
      .from(
        this.elements.hamburger,
        {
          scaleX: 0,
          stagger: -0.1,
          duration: 1.25,
          ease: "power4.inOut",
          transformOrigin: "left center",
        },
        0.8
      )
      .from(
        this.elements.scrollIndiText.split.chars,
        {
          xPercent: 100,
          stagger: 0.05,
          autoAlpha: 1,
          duration: 1.1,
          ease: "power2.out",
        },
        0.9
      )
      .fromTo(
        this.elements.waveContainer,
        {
          scaleX: 0,
          duration: 0.8,
          ease: "power4.inOut",
          transformOrigin: "left center",
        },
        { scaleX: 1, duration: 0.8, ease: "power4.inOut" },
        1.2
      )
      .to(
        this.elements.soundSwitchLabel,
        {
          opacity: 1,
          duration: 0.7,
        },
        1.95
      );
  }

  createIntroOutAnim() {
    let introOutTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#introPanel",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pinSpacing: false,
        pin: "#introPanel",
        paused: true,
      },
    });

    introOutTL
      .call(() => {
        this.tl.invalidate;
        this.tl.kill;
      })
      .to(
        this.elements.openSource.split.chars,
        {
          z: -12,
          yPercent: -10,
          autoAlpha: 0,
          rotateY: -4,
          duration: 1.8,
          ease: "power3.inOut",
          stagger: {
            each: 0.07,
            ease: "power2.inOut",
            from: "edges",
          },
        },
        "scrollingOut"
      )
      .to(
        this.elements.openScience.split.chars,
        {
          z: -22,
          yPercent: 14,
          autoAlpha: 0,
          ease: "power3.inOut",
          rotateY: 5,
          stagger: {
            each: 0.07,
            ease: "power3.inOut",
            from: "edges",
          },
          duration: 1.8,
        },
        "scrollingOut"
      )
      .to(
        this.elements.introPara.split.lines,
        {
          z: -2,
          y: 9,
          autoAlpha: 0,
          color: colors.teal,
          rotateY: 10,
          ease: "power2.inOut",
          duration: 0.7,
          stagger: 0.14,
        },
        "scrollingOut+=50%"
      )
      .to(
        this.elements.indiContainer,
        {
          scaleY: 0,
          transformOrigin: "center bottom",
          duration: 0.75,
        },
        "scrollingOut+=70%",
        "indi"
      )
      .to(
        this.elements.scrollIndiText.split.chars,
        {
          autoAlpha: 0,
          duration: 0.75,
          stagger: 0.09,
        },
        "scrollingOut+=70%",
        "indi"
      );
    ScrollTrigger.refresh();
    // Only give scrolling back AFTER the outro timeline has been created, not after intro has fired
    gsap.to("html", {
      overflowY: "auto",
    });
  }
}
