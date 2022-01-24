import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import lottie from "lottie-web";

let hamburgerContainer = document.getElementById("hamburgerIcon");
let hamburgerMenu = document.getElementById("mobileMenu");
let mobileNavLinks = gsap.utils.toArray("#mobileMenu #mobileNav h1");

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

function setupMobileAnimation() {
  let w = window.innerWidth;
  if (w > 480) {
    function setupMobileNavLinks() {
      mobileNavLinks.forEach((e) => {
        if (e.anim) {
          e.anim.progress(1).kill();
          e.split.revert();
        }
        e.split = new SplitText(e, {
          type: "lines",
          linesClass: "splitLine",
        });
        e.anim = gsap.from(e.split.lines, {
          yPercent: 100,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.inOut",
          stagger: 0.4142,
        });
      });
    }

    ScrollTrigger.addEventListener("refresh", setupMobileNavLinks, {
      passive: true,
    });
    setupMobileNavLinks();

    var hamburgerAnim = lottie.loadAnimation({
      container: document.getElementById("hamburgerIcon"),
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "https://assets3.lottiefiles.com/packages/lf20_szqyrfxy.json",
    });

    gsap.set(hamburgerMenu, {
      autoAlpha: 0,
      display: "flex",
    });

    hamburgerAnim.setSpeed(0.8);

    var direction = 1;

    let mowTL = gsap.timeline({
      paused: true,
    });

    mowTL.to(hamburgerMenu, {
      autoAlpha: 1,
      duration: 0.45,
      ease: "power3.inOut",
    });
    mowTL.reversed(true);

    hamburgerContainer.addEventListener("click", (event) => {
      hamburgerAnim.setDirection(direction);
      hamburgerAnim.play();
      direction = -direction;

      mowTL.reversed() ? mowTL.play() : mowTL.reverse();
    });
  }
}

document.addEventListener("resize", setupMobileAnimation);

setupMobileAnimation();
