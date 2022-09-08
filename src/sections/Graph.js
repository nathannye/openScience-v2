import Component from "../classes/Component";
import * as d3 from "d3";
import { chartToExascale, chartToPandemic, colors } from "../data";
import gsap from "gsap";

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

      // chart.bars = chart.container.querySelectorAll("rect.bar");

      // function xAxis(g) {
      //   g.attr("transform", `translate(0, ${height - margin.bottom})`)
      //     .attr("id", "xAxis")
      //     .call(d3.axisBottom(x).tickFormat((i) => chart[i].date));
      // }

      // function yAxis(g) {
      //   g.attr("transform", `translate(${margin.left}, 0)`)
      //     .attr("id", "yAxis")
      //     .call(d3.axisLeft(y).ticks(null, chart.format));
      // }
      // svg.append("g").call(yAxis);
      // svg.append("g").call(xAxis);
      svg.node();
    });
  }

  createChartAnimation() {
    let tillPandemic =
      this.elements.toPandemicChart.querySelectorAll("rect.bar");

    let tillExascale =
      this.elements.toExascaleChart.querySelectorAll("rect.bar");

    let declarePandemic = tillPandemic[8];
    gsap.set("rect.bar", {
      opacity: 0,
      fill: colors.teal,
      scaleY: 0.35,
      transformOrigin: "center bottom",
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        pin: this.element,
        scrub: 0.35,
        markers: true,
        trigger: this.element,
        start: "top top",
        end: "+=2000",
      },
    });
    tl.to(
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
        this.elements.eventMarker.item(0),
        {
          autoAlpha: 0,
          delay: 2,
        },
        ">+=1"
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
        },
        ">"
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
        this.elements.eventMarker.item(1),
        {
          autoAlpha: 0,
        },
        "<45%"
      );
  }
}
