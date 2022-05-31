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
        pin: true,
        scrub: 2,
        start: "top top",
        end: "bottom 70%",
        toggleActions: "play reverse play play",
      },
    });

    e.tl
      .from(
        e.split.words,
        {
          yPercent: 100,
          duration: 13,
          autoAlpha: 1,
          filter: "blur(8px)",
          ease: "power2.inOut",
          stagger: 9,
        },
        0
      )
      .to(e.split.words, {
        yPercent: 100,
        duration: 16,
        delay: 40,
        autoAlpha: 0,
        filter: "blur(8px)",
        ease: "power2.inOut",
        stagger: -9,
      });
  });
  ScrollTrigger.refresh();
}

ScrollTrigger.addEventListener("refresh", setupInterstitials);
setupInterstitials();
