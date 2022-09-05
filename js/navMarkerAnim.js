import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import colors from "./colors";

let navEntry = gsap.utils.toArray("nav > div > a");
let navDots = gsap.utils.toArray(".navMarker");
let sections = gsap.utils.toArray("section.contentPanel");
gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.to(navEntry, {
    opacity: 1,
    duration: 0.001,
  });

  function clearDotClasses() {
    navDots.forEach((dot) => {
      dot.classList.remove("activeNav");
    });
  }

  for (let i = 0; i < sections.length; i++) {
    let tl = gsap.timeline({
      scrollTrigger: {
        start: "top bottom",
        trigger: sections[i],
        onEnter: () => {
          clearDotClasses();
          navDots[i].classList.add("activeNav");
        },
        onEnterBack: () => {
          clearDotClasses();
          navDots[i].classList.add("activeNav");
        },
      },
    });
  }
  function createNavAnim() {
    navEntry.forEach((entry) => {
      entry.tl = gsap.timeline({
        paused: true,
      });

      let entryLabel = entry.querySelector("span");
      entryLabel.split = new SplitText(entryLabel, {
        type: "words, lines",
        linesClass: "splitLine",
      });

      gsap.set(entryLabel.split.words, {
        yPercent: 100,
        autoAlpha: 0,
      });

      entry.tl
        .to(
          entry.querySelector(".navMarker"),
          {
            x: -7,
            duration: 0.12,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          entryLabel.split.words,
          {
            yPercent: 0,
            autoAlpha: 1,
            ease: "power3.out",
            duration: 0.39,
            stagger: 0.02,
          },
          0.2
        );

      entry.addEventListener("mouseover", (event) => {
        entry.tl.play();
      });
      entry.addEventListener("mouseout", (event) => {
        entry.tl.reverse();
      });
    });
  }
  createNavAnim();
});
