import Component from "../classes/Component";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import Wave from "../animations/Wave";

export default class Title extends Component {
  constructor() {
    super({
      element: "#introHeadingContainer",
      elements: {
        ngl: "#viewport",
        navDots: ".navMarker",
        hamburger: "#hamburgerIcon > svg > g > g",
        scrollIndiText: "#scrollIndicator h4",
        waveContainer: "#soundIndicator",
        indiContainer: "#scrollAnimContainer",
        html: "html",
        introPara: "#introPanel p",
        introPanel: "#introPanel",
        soundSwitchLabel: "#soundLabelSwitch",
        title: "#introHeadingContainer h1",
      },
    });
    this.tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        // this.tl.kill();
      },
    });
    this.createIntroAnim();
  }

  create() {
    gsap.registerPlugin(SplitText);
    super.create();
  }

  createIntroAnim() {
    // this.tl.onComplete = () => {
    //   this.createIntroOutTL();
    // };

    let scrollIndiSplit = new SplitText(this.elements.scrollIndiText, {
      type: "lines, chars",
      linesClass: "splitLine",
    });
    let openSource = new SplitText(this.elements.title[0], {
      type: "chars",
    });
    let openScience = new SplitText(this.elements.title[1], {
      type: "chars",
    });

    let introtl = gsap.timeline();

    introtl
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
          duration: 3.5,
          delay: 0.3,
          autoAlpha: 1,
        },
        "start",
        "stageIn"
      )
      .to(
        openSource.chars,
        {
          yPercent: 0,
          opacity: 1,
          color: "white",
          stagger: {
            each: 0.035,
            ease: "power2.inOut",
            from: "start",
          },
          duration: 1.45,
          ease: "power3.out",
        },
        0.2
      )
      .to(
        openScience.chars,
        {
          yPercent: 0,
          opacity: 1,
          delay: 0.25,
          color: "yellow",
          stagger: {
            each: 0.035,
            ease: "power2.inOut",
            from: "start",
          },
          duration: 1.7,
          ease: "power3.out",
        },
        0.2
      )
      // .call(
      //   function () {
      //     introPara.tl.play();
      //   },
      //   null,
      //   "start"
      // )
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
      // .call(
      //   function () {
      //     let scrollIndi = Lottie.loadAnimation(
      //       {
      //         container: indiContainer,
      //         loop: false,
      //         renderer: "svg",
      //         quality: "low",
      //         autoplay: true,
      //         path: "https://assets10.lottiefiles.com/packages/lf20_n5nf19df.json",
      //       },
      //       null,
      //       "start"
      //     );
      //     scrollIndi.setSpeed(1.15);
      //   },
      //   null,
      //   0.9
      // )
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
        scrollIndiSplit.chars,
        {
          xPercent: 100,
          stagger: 0.05,
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
        this.wave,
        {
          amplitude: 0.5,
          duration: 1.25,
          ease: "none",
        },
        1.75
      )
      .to(
        this.wave,
        {
          frequency: 0.1,
          ease: "none",
          duration: 0.25,
        },
        ">"
      )
      .to(
        this.elements.soundSwitchLabel,
        {
          opacity: 1,
          duration: 0.7,
        },
        1.95
      );

    this.tl.add(introtl);
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
        introPara.tl.kill;
        introPara.tl.invalidate;
        titleTL.invalidate;
        titleTL.kill;
      })
      .to(
        openSource.split.chars,
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
        openScience.split.chars,
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
        introPara.split.lines,
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
        indiContainer,
        {
          scaleY: 0,
          transformOrigin: "center bottom",
          duration: 0.75,
        },
        "scrollingOut+=70%",
        "indi"
      )
      .to(
        scrollIndiSplit.chars,
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
    gsap.to(html, {
      overflowY: "auto",
    });
  }
}
