import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import colors from "./colors";

gsap.registerPlugin(ScrollTrigger);

const faq = [
  {
    question: "Do I need a super fast computer?",
    answer: "nah",
  },
  {
    question: "How often do I need to contribute",
    answer: "always bitch",
  },
  {
    question: "Will anybody have access to my computer",
    answer: "nah",
  },
  {
    question: "Have these actually projects cured any diseases?",
    answer: "go here",
  },
];

const faqContainer = document.getElementById("faqContainer");

for (let i = 0; i < faq.length; i++) {
  let article = document.createElement("article");
  article.classList.add("faqEntryContainer");

  faqContainer.appendChild(article);

  let flexContainer = document.createElement("div");
  let arrow = document.createElement("span");
  arrow.classList.add("faqArrow");

  flexContainer.appendChild(arrow);

  article.appendChild(flexContainer);

  let line = document.createElement("div");
  line.classList.add("faqQuestionLine");

  flexContainer.appendChild(line);

  let question = document.createElement("p");
  question.innerHTML = faq[i].question;

  flexContainer.appendChild(question);

  let answerContainer = document.createElement("div");
  answerContainer.classList.add("faqAnswer");

  article.appendChild(answerContainer);

  let answer = document.createElement("p");
  answer.innerHTML = faq[i].answer;

  answerContainer.appendChild(answer);

  let dropdown = gsap.timeline({
    paused: true,
  });

  dropdown.reversed(true);

  dropdown
    .to(
      arrow,
      {
        rotate: 0,
        duration: 0.24,
        ease: "power3.inOut",
        filter: "saturate(1)",
      },
      "start"
    )
    .to(
      answerContainer,
      {
        height: 100,
        ease: "power3.inOut",
        duration: 0.5,
      },
      "start"
    )
    .to(
      question,
      {
        color: colors.ylw,
        duration: 0.2,
      },
      "start"
    )
    .to(
      line,
      {
        background: colors.ylw,
        duration: 0.2,
      },
      "start"
    );

  flexContainer.addEventListener("click", (event) => {
    dropdown.reversed() ? dropdown.play() : dropdown.reverse();
  });

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: faqContainer,
      start: `top bottom-=${6 * [i]}%`,
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
      "lineContent"
    )
    .from(
      arrow,
      {
        x: -10,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.inOut",
      },
      "lineContent"
    );
}
