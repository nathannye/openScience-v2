import Component from "../classes/Component";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import Lottie from "lottie-web";

export default class Nav extends Component {
  constructor() {
    super({
      element: "nav",
      elements: {
        navEntries: "nav > div > a",
        navDots: ".navMarker",
        html: "html",
        sections: "section.contentPanel",
        hamburgerMenu: "#mobileMenu",
        hamburgerContainer: "#hamburgerIcon",
        mobileNavLinks: "#mobileNav h1",
      },
    });
  }

  create() {
    super.create();
    // this.clearNavClasses();
    this.conditionalNav();
  }

  overflowControl() {
    this.elements.html.style.overflowY == "auto" ||
    this.elements.html.style.overflowY == ""
      ? (this.elements.html.style.overflowY = "hidden")
      : (this.elements.html.style.overflowY = "auto");

    // if (
    //   this.elements.html.style.overflowY == "auto" ||
    //   this.elements.html.style.overflowY == ""
    // ) {
    //   gsap.to(this.elements.html, {
    //     overflowY: "hidden",
    //   });
    // } else {
    //   gsap.to(this.elements.html, {
    //     overflowY: "auto",
    //   });
    // }
  }

  createNav() {
    for (let i = 0; i < this.elements.sections.length; i++) {
      let tl = gsap.timeline({
        scrollTrigger: {
          start: "top bottom",
          trigger: this.elements.sections[i],
          onEnter: () => {
            this.clearNavClasses();
            this.elements.navDots[i].classList.add("activeNav");
          },
          onEnterBack: () => {
            this.clearNavClasses();
            this.elements.navDots[i].classList.add("activeNav");
          },
        },
      });
    }
  }

  createAnimations() {
    this.elements.navEntries.forEach((entry) => {
      entry.tl = gsap.timeline({
        paused: true,
      });

      entry.label = entry.querySelector("span");
      entry.label.split = new SplitText(entry.label, {
        type: "words, lines",
        linesClass: "splitLine",
      });

      gsap.set(entry.label.split.words, {
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
          entry.label.split.words,
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

  conditionalNav() {
    let mm = gsap.matchMedia();

    mm.add("(min-width:768px)", () => {
      this.createNav();
      this.createAnimations();
    });

    mm.add("(max-width: 768px)", () => {
      let mowTL = gsap.timeline({
        paused: true,
      });

      gsap.set(this.elements.hamburgerMenu, {
        autoAlpha: 0,
        display: "flex",
      });

      var hamburgerAnim = Lottie.loadAnimation({
        container: document.getElementById("hamburgerIcon"),
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "https://assets6.lottiefiles.com/packages/lf20_szqyrfxy.json",
      });
      hamburgerAnim.setSpeed(1.15);
      var direction = 1;

      mowTL
        .to(
          this.elements.hamburgerMenu,
          {
            autoAlpha: 1,
            duration: 0.35,
          },
          0
        )
        .from(
          this.elements.hamburgerMenu.querySelectorAll("a"),
          {
            autoAlpha: 0,
            y: 20,
            scale: 0.96,
            transformOrigin: "center center",
            stagger: 0.1,
          },
          0.1
        )
        .call(this.overflowControl(), null, 0);

      this.elements.hamburgerContainer.onclick = () => {
        hamburgerAnim.setDirection(direction);
        hamburgerAnim.play();
        direction = -direction;

        mowTL.reversed()
          ? mowTL.timeScale(1).play()
          : mowTL.timeScale(1.2).reverse();
      };

      return () => {
        this.elements.hamburgerContainer.onclick = () => null;
        mowTL.kill();
        hamburgerAnim.destroy();
      };
    });
  }

  createHamburger() {
    let mm = gsap.matchMedia();

    mm.add("max-width: 768px", () => {
      return () => {
        var hamburgerAnim = lottie.loadAnimation({
          container: document.getElementById("hamburgerIcon"),
          renderer: "svg",
          loop: false,
          autoplay: false,
          path: "https://assets6.lottiefiles.com/packages/lf20_szqyrfxy.json",
        });
      };
    });
  }

  clearNavClasses() {
    this.elements.navDots.forEach((dot) => {
      dot.classList.remove("activeNav");
    });
  }
}
