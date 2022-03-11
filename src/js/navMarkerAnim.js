import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import colors from "./colors";

let navEntry = gsap.utils.toArray("nav > div > a");
let navDots = gsap.utils.toArray(".navMarker");
let sections = gsap.utils.toArray("section.contentPanel");

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", (event) => {
  for (let i = 0; i < sections.length; i++) {
    let tl = gsap.timeline({
      scrollTrigger: {
        start: "top bottom+=1%",
        end: "bottom bottom-=12%",
        trigger: sections[i],
        onEnter: () => {
          navDots[i].classList.add("activeNav");
        },
        onLeave: () => {
          navDots[i].classList.remove("activeNav");
        },
        onEnterBack: () => {
          navDots[i].classList.add("activeNav");
        },
        onLeaveBack: () => {
          navDots[i].classList.remove("activeNav");
        },
      },
    });
  }
});

navEntry.forEach((entry) => {
  entry.tl = gsap.timeline({
    paused: true,
  });

  let entryLabel = entry.querySelector("p");
  entryLabel.split = new SplitText(entryLabel, {
    type: "words, lines",
    linesClass: "splitLine",
  });

  entry.tl
    .to(
      entry.querySelector(".navMarker"),
      {
        x: -7,
        duration: 0.1,
      },
      "hover"
    )
    .from(
      entryLabel.split.words,
      {
        // x: "-.5rem",
        // color: colors.teal,
        yPercent: 100,
        ease: "power2.inOut",
        duration: 0.23,
        stagger: {
          each: ".008",
        },
      },
      "hover"
    );

  entry.addEventListener("mouseover", (event) => {
    entry.tl.play();
  });
  entry.addEventListener("mouseout", (event) => {
    entry.tl.reverse();
  });
});

export default navDots;
