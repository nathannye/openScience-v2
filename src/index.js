import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
// import { random } from "gsap/gsap-core";
// import lottie from "lottie-web";
// import stage from "./js/nglScene";
import colors from "./js/colors";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

let introPara = document.querySelector("#introPanel p");

function setupIntroParaSplit() {
  introPara.split = new SplitText(introPara, {
    type: "lines, chars",
  });
}

ScrollTrigger.addEventListener("refresh", setupIntroParaSplit);
setupIntroParaSplit();

let content = document.querySelector("main");

let introPanel = document.querySelector("#introPanel");

let nglStage = document.querySelector("#viewport");
let html = document.querySelector("html");

gsap.to(nglStage, {
  scrollTrigger: {
    trigger: content,
    scrub: 2,
    rotateZ: 40,
    start: "top top",
    end: "bottom bottom",
  },
  yPercent: -3.4,
});

let h4 = document.querySelector("#whatDoProteins h4");
h4.split = new SplitText(h4, {
  type: "words",
});

let h2 = document.querySelectorAll("h2.headAnim");
function setupFarAndAway() {
  h2.forEach((e) => {
    if (e.anim) {
      e.anim.progress(1).kill();
      e.split.revert();
    }
    e.split = new SplitText(e, {
      type: "words, lines",
      linesClass: "splitLine",
    });
    e.anim = gsap.from(e.split.words, {
      scrollTrigger: {
        trigger: e,
        start: "top bottom-=44%",
        // toggleActions: "restart play play restart",
      },
      yPercent: 100,
      autoAlpha: 0,
      duration: 1,
      ease: "power4.inOut",
      stagger: 0.0142,
    });
  });
}

ScrollTrigger.addEventListener("refresh", setupFarAndAway);
setupFarAndAway();

// Paragraphs anim
let paras = gsap.utils.toArray("p.paraAnim");

function setupParas() {
  paras.forEach((para) => {
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split.revert();
    }
    para.split = new SplitText(para, {
      type: "lines",
    });
    para.anim = gsap.from(para.split.lines, {
      scrollTrigger: {
        start: "top 74%",
        trigger: para,
      },
      autoAlpha: 0,
      y: 15,
      rotateY: -8,
      ease: "power2.out",
      stagger: 0.09,
      duration: 0.9,
    });
  });
}
ScrollTrigger.addEventListener("refresh", setupParas);
setupParas();

// Image section
let images = gsap.utils.toArray("img.parallaxImage");
let imgTrigger = document.querySelector("#numberOfUsersPanel");

gsap.set(images, {
  clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
  // yPercent: 11,
});

gsap.to(images, {
  scrollTrigger: {
    start: "top top",
    trigger: imgTrigger,
  },
  duration: 1.1,
  ease: "power3.inOut",
  clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
  stagger: 0.17,
});

gsap.to(images[0], {
  scrollTrigger: {
    scrub: true,
    start: "top bottom",
    end: "bottom top",
    trigger: "#numberOfUsersPanel",
  },
  yPercent: -60,
});
gsap.to(images[1], {
  scrollTrigger: {
    scrub: true,
    start: "top bottom",
    end: "bottom top",
    trigger: "#numberOfUsersPanel",
  },
  yPercent: -22,
});
gsap.to(images[2], {
  scrollTrigger: {
    scrub: true,
    start: "top bottom",
    end: "bottom top",
    trigger: "#numberOfUsersPanel",
  },
  yPercent: -19,
});
gsap.to(images[3], {
  scrollTrigger: {
    scrub: true,
    start: "top bottom",
    end: "bottom top",
    trigger: "#numberOfUsersPanel",
  },
  yPercent: 87,
});

// Link animations

const links = gsap.utils.toArray("cite > a, a.externalLink");

links.forEach((link) => {
  let e = document.createElement("div");
  let f = document.createElement("div");
  e.className = "underline";
  f.className = "underlineLeft";
  link.appendChild(e);
  link.appendChild(f);

  e.tl = gsap.timeline({
    paused: true,
  });

  e.tl
    .to(
      e,
      {
        xPercent: 100,
        duration: 0.4,
        background: colors.ylw,
        ease: "power3.inOut",
      },
      "start"
    )
    .to(
      f,
      {
        xPercent: 100,
        duration: 0.4,
        background: colors.ylw,
        ease: "power3.inOut",
      },
      "start+=.085"
    )
    .to(
      link,
      {
        color: colors.ylw,
        duration: 0.45,
      },
      "start"
    );

  link.addEventListener("mouseover", (event) => {
    e.tl.play();
  });

  link.addEventListener("mouseout", (event) => {
    e.tl.reverse();
  });
});
