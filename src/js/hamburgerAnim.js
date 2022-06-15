import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import lottie from "lottie-web";

gsap.registerPlugin(ScrollTrigger, SplitText);

let hamburgerContainer = document.getElementById("hamburgerIcon");
let hamburgerMenu = document.getElementById("mobileMenu");
let mobileNavLinks = gsap.utils.toArray("#mobileMenu #mobileNav h1");
let html = document.querySelector("html");

let mowTL = gsap.timeline({
  paused: true,
});

function setupMobileAnimation() {
  // ScrollTrigger.addEventListener("refresh", setupMobileNavLinks, {
  //   passive: true,
  // });
  var hamburgerAnim = lottie.loadAnimation({
    container: document.getElementById("hamburgerIcon"),
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "https://assets6.lottiefiles.com/packages/lf20_szqyrfxy.json",
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

  hamburgerAnim.setSpeed(1.15);

  var direction = 1;

  mowTL
    .to(
      hamburgerMenu,
      {
        autoAlpha: 1,
        duration: 0.35,
      },
      0
    )
    .from(
      hamburgerMenu.querySelectorAll("a"),
      {
        autoAlpha: 0,
        y: 20,
        scale: 0.96,
        transformOrigin: "center center",
        stagger: 0.1,
      },
      0.1
    )
    .call(overflowControl(), null, 0);

  mowTL.reversed(true);

  hamburgerContainer.addEventListener("click", (event) => {
    hamburgerAnim.setDirection(direction);
    hamburgerAnim.play();
    direction = -direction;

    mowTL.reversed()
      ? mowTL.timeScale(1).play()
      : mowTL.timeScale(1.2).reverse();
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      mowTL.timeScale(1.4).reverse();
      hamburgerAnim.setDirection(direction);
      hamburgerAnim.play();
      direction = -direction;
    });
  });
}

document.addEventListener("resize", setupMobileAnimation);

setupMobileAnimation();
