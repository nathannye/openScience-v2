import gsap from "gsap";

let container = document.getElementById("loader");
let backer = document.getElementById("loaderBacker");
import setupIntroTL from "./introAnims";

let loader = gsap.timeline({
  onComplete: setupIntroTL(),
});

loader.to(container, {
  scale: 0.4,
  duration: 1,
});

window.addEventListener("load", (event) => {
  gsap.to(container, {
    autoAlpha: 0,
  });

    setupIntroTL();
    
});
