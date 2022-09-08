import Component from "../classes/Component";
import gsap from "gsap";
import { colors, faq } from "../data";

export default class Faq extends Component {
  constructor() {
    super({
      element: "#faqContainer",
      elements: {
        questions: ".faqEntryContainer",
      },
    });
  }

  create() {
    super.create();
    this.articles = [];
    this.createFaqEntries();
    this.createAnim();
  }

  createFaqEntries() {
    const container = document.querySelector("#faqContainer");
    for (let i = 0; i < faq.length; i++) {
      this.article = {};
      this.article.container = document.createElement("article");
      this.article.container.classList.add("faqEntryContainer");

      container.appendChild(this.article.container);

      let flexContainer = document.createElement("div");
      flexContainer.classList.add("faqEntryHeader");
      let arrow = document.createElement("span");
      arrow.classList.add("faqArrow");

      flexContainer.appendChild(arrow);

      this.article.container.appendChild(flexContainer);

      let line = document.createElement("div");
      line.classList.add("faqQuestionLine");

      flexContainer.appendChild(line);

      let question = document.createElement("p");
      question.innerHTML = faq[i].question;

      flexContainer.appendChild(question);

      let answerContainer = document.createElement("div");
      answerContainer.classList.add("faqAnswer");

      this.article.container.appendChild(answerContainer);

      let answer = document.createElement("p");
      answer.innerHTML = faq[i].answer;

      answerContainer.appendChild(answer);

      this.article.tl = gsap.timeline({
        paused: true,
      });
      this.article.tl.reversed(true);

      var maxH = answerContainer.scrollHeight;

      window.addEventListener("resize", () => {
        maxH = answerContainer.scrollHeight;
      });

      this.article.tl
        .to(
          answerContainer,
          {
            height: maxH + 20,
            ease: "none",
            autoRound: false,
            duration: 0.25,
          },
          0
        )
        .to(
          question,
          {
            color: colors.ylw,
            duration: 0.2,
            ease: "none",
          },
          0
        )
        .to(
          line,
          {
            background: colors.ylw,
            duration: 0.2,
            ease: "none",
          },
          0
        )
        .to(
          arrow,
          {
            rotate: 0,
            duration: 0.24,
            ease: "power1.inOut",
            filter: "saturate(1)",
          },
          0
        );

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.element,
          start: `top bottom-=${6 * [i]}%`,
        },
        onComplete: () => {
          tl.kill();
        },
      });

      tl.from(line, {
        scaleX: 0,
        stagger: 0.08,
        transformOrigin: "left center",
      })
        .from(
          question,
          {
            autoAlpha: 0,
            duration: 0.35,
          },
          0.1
        )
        .from(
          arrow,
          {
            x: -10,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.inOut",
          },
          0.1
        );

      this.articles.push(this.article);
    }
  }

  createAnim() {
    console.log(this.articles);
    this.articles.forEach((article) => {
      let target = article.container.querySelector(".faqEntryHeader");
      target.addEventListener("click", () => {
        if (article.tl.reversed()) {
          this.articles.forEach((article) => {
            article.tl.reverse();
          });

          article.tl.play();
        } else {
          article.tl.reverse();
        }
      });
    });
  }
}
