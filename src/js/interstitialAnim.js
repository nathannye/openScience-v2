import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

let interstitials = gsap.utils.toArray(".panel.interstitial");

function setupInterstitials() {
  interstitials.forEach((e) => {
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

  return () => {
    e.tl.kill();
  };
}

setupInterstitials();
