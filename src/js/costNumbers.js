import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

let twoThouFlip = gsap.utils.toArray("#twoThou .numberFlipperContainer > div");
let fiveThouFlip = gsap.utils.toArray(
  "#fiveThou .numberFlipperContainer > div"
);
let crossOuts = gsap.utils.toArray(".crossOut");

let twoThouChars = document.querySelectorAll(
  "#twoThou .commaChar, #twoThou .dollarChar"
);
let fiveThouChars = document.querySelectorAll(
  "#fiveThou .commaChar, #fiveThou .dollarChar"
);

let reduceCost = document.getElementById("helpingReduceCosts");

let numbersFlipping = gsap.timeline({
  scrollTrigger: {
    trigger: reduceCost,
    start: "top bottom-=44%",
    markers: true,
  },
});
gsap.set([twoThouFlip, fiveThouFlip], {
  autoAlpha: 0,
});

numbersFlipping
  .to(
    fiveThouFlip,
    {
      yPercent: -75,
      duration: 0.79,
      autoAlpha: 1,

      ease: "power3.inOut",
      stagger: {
        each: ".07",
        ease: "power3.inOut",
      },
    },
    "start"
  )
  .from(
    fiveThouChars,
    {
      autoAlpha: 0,
      stagger: 0.02,
    },
    "start"
  )
  .to(
    twoThouFlip,
    {
      yPercent: -75,
      autoAlpha: 1,

      duration: 0.79,
      ease: "power3.inOut",
      stagger: {
        each: ".07",
        ease: "power3.inOut",
      },
    },
    "start+=.28"
  )
  .from(
    twoThouChars,
    {
      autoAlpha: 0,
      stagger: 0.02,
    },
    "start+=.15"
  )
  .from(
    crossOuts,
    {
      scaleX: 0,
      transformOrigin: "left center",
      ease: "power4.inOut",
      duration: 0.58,
      stagger: 0.08,
    },
    ">+=.05",
    "crossOut"
  )
  .to(
    [fiveThouChars, fiveThouFlip, twoThouChars, twoThouFlip],
    {
      opacity: 0.4,
      duration: 0.32,
      stagger: 0.01,
    },
    "crossOut-=.34"
  );
