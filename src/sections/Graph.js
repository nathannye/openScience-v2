import Component from "../classes/Component";
import * as d3 from "d3";
import { chartToExascale, chartToPandemic, colors } from "../data";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

export default class Graph extends Component {
  constructor() {
    super({
      element: "#chartOfUsers",
      elements: {
        eventLargeCaption: "#chartCaptionContainer > h2",
        eventMarker: ".eventMarker",
        toPandemicChart: "#toPandemicChart",
        toExascaleChart: "#toExascaleChart",
        charts: "#chartsContainer",
        pandemicHead: "#pandemicEventMarker h4",
        exascaleHead: "#exascaleEventMarker h4",
        userNumbersContainer: ".userNumbersContainer",
        appendNumbers: ".userNumbersContainer > div",
      },
    });
  }

  create() {
    super.create();
    this.charts = [
      {
        data: chartToPandemic,
        container: this.elements.toPandemicChart,
        width: chartToPandemic.length,
        height: 55,
      },
      {
        data: chartToExascale,
        container: this.elements.toExascaleChart,
        width: chartToExascale.length,
        height: 325,
      },
    ];

    this.createCharts();
    this.createChartAnimation();
    this.createUserNumbers();
  }

  createCharts() {
    this.charts.forEach((chart, index) => {
      let heightValue = chart.width;
      let widthValue = chart.height;

      let svg = d3
        .select(chart.container)
        .append("svg")
        .attr("viewBox", `0 0 ${widthValue} ${heightValue}`);

      let margin = { top: 0, bottom: 0, left: 0, right: 0 };

      let height = heightValue - margin.top - margin.bottom;
      let width = widthValue - margin.left - margin.right;

      let x = d3
        .scaleBand()
        .domain(d3.range(chart.data.length))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      let y = d3
        .scaleLinear()
        .domain([0, 1200000])
        .range([height - margin.bottom, margin.top]);

      svg
        .append("g")
        .attr("fill", colors.gry)
        .selectAll("rect")
        .data(chart.data.sort((a, b) => d3.ascending(a.users, b.users)))
        .join("rect")
        .attr("x", (d, i) => x(i))
        // .attr("y", (d) => y(d.users))
        .attr("y", function (d) {
          return y(d.users);
        })
        // .attr("height", (d) => y(0) - y(d.users))
        .attr("height", function (d) {
          return height - y(d.users);
        })
        .attr("width", x.bandwidth())
        .attr("class", "bar");
      svg.node();
    });
  }

  createUserNumbers() {
    this.charts.reverse().forEach((chart) => {
      chart.data.reverse().forEach((point, index) => {
        let c = document.createElement("span");
        c.innerHTML = Math.round(point.users);
        this.elements.appendNumbers.appendChild(c);
        if (index == 0) {
          c.classList.add("ylw");
        }
      });
    });
  }

  createChartAnimation() {
    let tillPandemic =
      this.elements.toPandemicChart.querySelectorAll("rect.bar");
    let tillExascale =
      this.elements.toExascaleChart.querySelectorAll("rect.bar");

    const pandemicSplit = {};
    const exascaleSplit = {};

    pandemicSplit.heading = new SplitText(
      this.elements.eventMarker.item(0).querySelector("h2"),
      {
        type: "lines, words",
        linesClass: "splitLine",
      }
    );

    pandemicSplit.para = new SplitText(
      this.elements.eventMarker.item(0).querySelector("p"),
      {
        type: "lines",
      }
    );

    exascaleSplit.heading = new SplitText(
      this.elements.eventMarker.item(1).querySelector("h2"),
      {
        type: "lines, words",
        linesClass: "splitLine",
      }
    );

    exascaleSplit.para = new SplitText(
      this.elements.eventMarker.item(1).querySelector("p"),
      {
        type: "lines",
      }
    );

    let declarePandemic = tillPandemic[8];
    gsap.set("rect.bar", {
      opacity: 0,
      fill: colors.teal,
      scaleY: 0.35,
      transformOrigin: "center bottom",
    });

    let mm = gsap.matchMedia();

    // Above 768 (desktop)
    mm.add("(min-width:768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          pin: this.element,
          scrub: 0.35,
          trigger: this.element,
          start: "top top",
          end: "+=4000",
        },
      });

      tl.to(
        this.elements.appendNumbers,
        {
          yPercent: -7.5,
          duration: 62,
        },
        0
      )
        .to(
          tillPandemic,
          {
            opacity: 1,
            scaleY: 1,
            fill: colors.gry,
            stagger: {
              each: 2,
            },
            duration: 5,
          },
          0
        )
        .to(
          declarePandemic,
          {
            opacity: 1,
            scaleY: 1,
            duration: 5,
            fill: colors.ylw,
          },
          ">"
        )
        .from(
          pandemicSplit.heading.words,
          {
            yPercent: 100,
            duration: 7,
            ease: "power3.inOut",
            stagger: 1.25,
          },
          ">+=1"
        )
        .from(
          pandemicSplit.para.lines,
          {
            autoAlpha: 0,
            yPercent: 12,
            rotateY: -8,
            color: colors.teal,
            ease: "power2.out",
            stagger: 3,
            duration: 7,
          },
          "<"
        )
        .from(
          this.elements.pandemicHead,
          {
            autoAlpha: 0,
            duration: 6,
            yPercent: 20,
          },
          "<"
        )
        .to(
          tillExascale,
          {
            opacity: 1,
            scaleY: 1,
            fill: colors.gry,
            stagger: {
              each: 1,
            },
            duration: 5,
            delay: 20,
          },
          ">"
        )
        .to(
          this.elements.appendNumbers,
          {
            yPercent: -99,
            duration: 90,
          },
          "<+=2"
        )
        .to(
          this.elements.charts,
          {
            xPercent: -80,
            duration: 150,
          },
          "<+=15"
        )

        .from(
          exascaleSplit.heading.words,
          {
            yPercent: 100,
            duration: 7,
            ease: "power3.inOut",
            stagger: 1.25,
          },
          "<45%"
        )
        .from(
          exascaleSplit.para.lines,
          {
            autoAlpha: 0,
            yPercent: 12,
            rotateY: -8,
            color: colors.teal,
            ease: "power2.out",
            stagger: 3,
            duration: 7,
          },
          "<"
        )
        .from(
          this.elements.exascaleHead,
          {
            autoAlpha: 0,
            yPercent: 20,
            duration: 6,
          },
          "<"
        );

      return () => {
        tl.kill();
      };
    });

    // Below 768 (Mobile)
    mm.add("(max-width:768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          pin: this.element,
          scrub: 0.35,
          trigger: this.element,
          start: "top top",
          end: "+=4000",
        },
      });

      tl.to(
        this.elements.appendNumbers,
        {
          yPercent: -7.5,
          duration: 62,
        },
        0
      )
        .to(
          tillPandemic,
          {
            opacity: 1,
            scaleY: 1,
            fill: colors.gry,
            stagger: {
              each: 2,
            },
            duration: 5,
          },
          0
        )
        .to(
          declarePandemic,
          {
            opacity: 1,
            scaleY: 1,
            duration: 5,
            fill: colors.ylw,
          },
          ">"
        )
        .from(
          pandemicSplit.heading.words,
          {
            yPercent: 100,
            duration: 7,
            ease: "power3.inOut",
            stagger: 1.25,
          },
          ">+=1"
        )
        .from(
          pandemicSplit.para.lines,
          {
            autoAlpha: 0,
            yPercent: 12,
            rotateY: -8,
            color: colors.teal,
            ease: "power2.out",
            stagger: 3,
            duration: 7,
          },
          "<"
        )
        .from(
          this.elements.pandemicHead,
          {
            autoAlpha: 0,
            duration: 6,
            yPercent: 20,
          },
          "<"
        )
        .to(
          tillExascale,
          {
            opacity: 1,
            scaleY: 1,
            fill: colors.gry,
            stagger: {
              each: 1,
            },
            duration: 5,
            delay: 20,
          },
          ">"
        )
        .to(
          this.elements.appendNumbers,
          {
            yPercent: -99,
            duration: 90,
          },
          "<+=2"
        )
        .to(
          this.elements.charts,
          {
            xPercent: -80,
            duration: 110,
          },
          "<"
        )

        .from(
          exascaleSplit.heading.words,
          {
            yPercent: 100,
            duration: 7,
            ease: "power3.inOut",
            stagger: 1.25,
          },
          ">"
        )
        .from(
          exascaleSplit.para.lines,
          {
            autoAlpha: 0,
            yPercent: 12,
            rotateY: -8,
            color: colors.teal,
            ease: "power2.out",
            stagger: 3,
            duration: 7,
          },
          "<"
        )
        .from(
          this.elements.exascaleHead,
          {
            autoAlpha: 0,
            yPercent: 20,
            duration: 6,
          },
          "<"
        );

      return () => {
        tl.kill();
      };
    });
  }
}
