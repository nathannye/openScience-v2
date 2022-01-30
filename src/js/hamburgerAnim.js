import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import lottie from "lottie-web";
import colors from "./colors";

let hamburgerContainer = document.getElementById("hamburgerIcon");
let hamburgerMenu = document.getElementById("mobileMenu");
let mobileNavLinks = gsap.utils.toArray("#mobileMenu #mobileNav h1");
let html = document.querySelector("html");

mobileNavLinks.split = new SplitText(mobileNavLinks, {
  type: "lines",
});

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

// function setupMobileAnimation() {
// function setupMobileNavLinks() {
//   mobileNavLinks.forEach((e) => {
//     if (e.anim) {
//       e.anim.progress(1).kill();
//       e.split.revert();
//     }
//     e.split = new SplitText(e, {
//       type: "lines",
//       linesClass: "splitLine",
//     });
//     e.anim = gsap.from(e.split.lines, {
//       yPercent: 100,
//       autoAlpha: 0,
//       duration: 1,
//       ease: "power3.inOut",
//       stagger: 0.4142,
//     });
//   });
// }

// ScrollTrigger.addEventListener("refresh", setupMobileNavLinks, {
//   passive: true,
// });
// setupMobileNavLinks();

var hamburgerAnim = lottie.loadAnimation({
  container: document.getElementById("hamburgerIcon"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "https://assets2.lottiefiles.com/packages/lf20_szqyrfxy.json",
});

function overflowControl() {
  if (html.style.overflowY == "auto" || html.style.overflowY == "") {
    gsap.to(html, {
      overflowY: "hidden",
    });
  } else {
    gsap.to(html, {
      overflowY: "auto",
    });
  }
}

gsap.set(hamburgerMenu, {
  autoAlpha: 0,
  display: "flex",
});

hamburgerAnim.setSpeed(0.8);

var direction = 1;

let mowTL = gsap.timeline({
  paused: true,
});

mowTL
  .to(
    hamburgerMenu,
    {
      autoAlpha: 1,
      duration: 0.85,
      ease: "power2.inOut",
    },
    "menuOpen"
  )
  .call(overflowControl(), "menuOpen")
  .from(
    mobileNavLinks.split.lines,
    {
      y: 15,
      rotateY: 8,
      z: -4,
      transformOrigin: "left center",
      autoAlpha: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.13,
    },
    "menuOpen+=.3"
  );
mowTL.reversed(true);

hamburgerContainer.addEventListener("click", (event) => {
  hamburgerAnim.setDirection(direction);
  hamburgerAnim.play();
  direction = -direction;

  mowTL.reversed()
    ? mowTL.timeScale(1.2).play()
    : mowTL.timeScale(2.2).reverse();
});

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    mowTL.timeScale(2.2).reverse();
    hamburgerAnim.setDirection(direction);
    hamburgerAnim.play();
    direction = -direction;
  });
});

// }
// }

// document.addEventListener("resize", setupMobileAnimation);

// setupMobileAnimation();
