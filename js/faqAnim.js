import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import colors from "./colors";

gsap.registerPlugin(ScrollTrigger);

const faq = [
  {
    question: "Do I need a super fast computer?",
    answer:
      "Not at all! As long as your system meets the minimum requirements for a projects you're all set. Of course, the faster the computer, the more folding you can help with. But if you've only got an older PC or Mac, the help is still appreciated. (Bonus points for those of you with GPU's)",
  },
  {
    question: "How often do I need to contribute?",
    answer:
      "There is no maximum or minimum time that you need to spend helping, we appreciate any level of contribution. If you can only fold on weekends when you aren't using your computer for work, that works for us!",
  },
  {
    question: "Will anybody have access to my computer?",
    answer:
      "Nope! These programs send your computer a mathematical problem privately (over encrypted connections). When your computer has solved its piece, it is sent back. They don't sell or farm data of any kind. They just wait for your returned mathematic response, rinse, and repeat",
  },
  {
    question: "Have these actually projects cured any diseases?",
    answer:
      "Short answer: Kinda, but their purpose is far more supportive. Long answer: The technology these programs use to fold proteins cannot directly cure Cancer or Alzheimer's. But what they can do is help scientists weed out protein areas that are not worth the time for them to investigate. They can move on and study potentially helpful proteins with more precise methods (like X-Ray Crystallography) instead of wasting these resources of non-useful proteins.",
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

  article.tl = gsap.timeline({
    paused: true,
  });

  let maxH = answerContainer.scrollHeight;

  article.tl.reversed(true);

  article.tl
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
      0.2
    );

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: faqContainer,
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
}

function setupActive() {
  const allQuestions = document.querySelectorAll(".faqEntryContainer");

  allQuestions.forEach((article) => {
    article.addEventListener("click", () => {
      if (article.tl.reversed()) {
        allQuestions.forEach((article) => {
          article.tl.reverse();
        });

        article.tl.play();
      } else {
        article.tl.reverse();
      }
    });
  });
}

setupActive();
