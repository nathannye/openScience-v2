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
        eventMarker: "article.eventEntry",
        toPandemicChart: "#toPandemicChart",
        toExascaleChart: "#toExascaleChart",
      },
    });
  }

  create() {
    super.create();
    console.log(this.elements);
    this.charts = [
      {
        data: chartToPandemic,
        container: this.elements.toPandemicChart,
      },
      {
        data: chartToExascale,
        container: this.elements.toExascaleChart,
      },
    ];
    this.createCharts();
    // this.createChartAnimation();
  }

  createCharts() {
    this.charts.forEach((chart, index) => {
      const heightValue = 325;
      const widthValue = 900;

      const svg = d3
        .select(chart.container)
        .append("svg")
        .attr("viewBox", `0 0 ${widthValue} ${heightValue}`);

      const margin = { top: 0, bottom: 0, left: 0, right: 0 };

      const height = 325 - margin.top - margin.bottom;
      const width = 900 - margin.left - margin.right;

      const x = d3
        .scaleBand()
        .domain(d3.range(chart.data.length))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3
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

      console.log(chart.container);

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

  // createCharts() {
  //   const heightValue = 325;
  //   const widthValue = 900;

  //   const svg = d3
  //     .select("#barChartContainer")
  //     .append("svg")
  //     .attr("viewBox", `0 0 ${widthValue} ${heightValue}`);

  //   const margin = { top: 0, bottom: 0, left: 0, right: 0 };

  //   const height = 325 - margin.top - margin.bottom;
  //   const width = 900 - margin.left - margin.right;

  //   const x = d3
  //     .scaleBand()
  //     .domain(d3.range(chart.length))
  //     .range([margin.left, width - margin.right])
  //     .padding(0.1);

  //   const y = d3
  //     .scaleLinear()
  //     .domain([0, 1200000])
  //     .range([height - margin.bottom, margin.top]);

  //   svg
  //     .append("g")
  //     .attr("fill", colors.gry)
  //     .selectAll("rect")
  //     .data(chart.sort((a, b) => d3.ascending(a.users, b.users)))
  //     .join("rect")
  //     .attr("x", (d, i) => x(i))
  //     // .attr("y", (d) => y(d.users))
  //     .attr("y", function (d) {
  //       return y(d.users);
  //     })
  //     // .attr("height", (d) => y(0) - y(d.users))
  //     .attr("height", function (d) {
  //       return height - y(d.users);
  //     })
  //     .attr("width", x.bandwidth())
  //     .attr("class", "bar");

  //   // function xAxis(g) {
  //   //   g.attr("transform", `translate(0, ${height - margin.bottom})`)
  //   //     .attr("id", "xAxis")
  //   //     .call(d3.axisBottom(x).tickFormat((i) => chart[i].date));
  //   // }

  //   // function yAxis(g) {
  //   //   g.attr("transform", `translate(${margin.left}, 0)`)
  //   //     .attr("id", "yAxis")
  //   //     .call(d3.axisLeft(y).ticks(null, chart.format));
  //   // }
  //   // svg.append("g").call(yAxis);
  //   // svg.append("g").call(xAxis);
  //   svg.node();
  // }

  createChartAnimation() {
    // let bars = gsap.utils.toArray("rect.bar");

    // let chart = document.querySelector("#barChartContainer");

    // // Event Markers
    // let declarePandemic = bars[8];
    // let exascaleMark = bars[bars.length - 1];
    // declarePandemic.setAttribute("id", "pandemicDeclaredMark");
    // declarePandemic.setAttribute("class", "eventMarker");
    // exascaleMark.setAttribute("id", "exascaleMark");
    // exascaleMark.setAttribute("class", "eventMarker");

    // let tillPandemic = bars.slice(0, 8);
    // let pandemicTillExa = bars.slice(9, bars.length);
    // let chartCaptions = gsap.utils.toArray("#chartCaptionContainer > h2");
    // let introCaption = chartCaptions[0];
    // let pandemicCaption = chartCaptions[1];
    // let exaCaption = chartCaptions[2];
    // let chartSectionContainer = document.getElementById("chartOfUsers");
    // let barChartContainer = document.getElementById("barChartContainer");

    gsap.set(this.charts[0].bars, {
      opacity: 0,
      fill: colors.teal,
      scaleY: 0.35,
      transformOrigin: "center bottom",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        pin: chartSectionContainer,
        scrub: 0.35,
        trigger: chartSectionContainer,
        start: "bottom bottom",
        end: "+=10000",
      },
    });

    tl.to(
      chartSectionContainer,
      {
        xPercent: 100,
        // duration: eveyrthing combined
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
        },
        0
      )
      .to(
        declarePandemic,
        {
          opacity: 1,
          scaleY: 1,
          fill: colors.ylw,
        },
        ">"
      )
      .to(
        chartCaptions[0],
        {
          opacity: 1,
          delay: 2,
        },
        ">+=1"
      )
      .to(
        chartCaptions[0],
        {
          opacity: 0,
        },
        ">+=4"
      )
      .to(
        pandemicTillExa,
        {
          opacity: 1,
          scaleY: 1,
          fill: colors.gry,
          stagger: {
            each: 1,
          },
        },
        ">"
      )
      .to(
        chartCaptions[1],
        {
          opacity: 1,
          delay: 2,
        },
        ">+=1"
      )
      .to(
        chartCaptions[1],
        {
          opacity: 0,
        },
        ">+=4"
      );

    // graphtl
    //   // Call first caption
    //   .from(chartCaptions[0], {
    //     opacity: 0,
    //     duration: 5,
    //   })
    //   // bars fill to pandemic bar
    //   .to(
    //     tillPandemic,
    //     {
    //       opacity: 1,
    //       scaleY: 1,
    //       fill: colors.gry,
    //       stagger: {
    //         each: 12,
    //       },
    //     },
    //     "moveToPandemic"
    //   )
    //   // move over a bit
    //   .to(
    //     barChartContainer,
    //     {
    //       x: "-30vw",
    //       ease: "power2.inOut",
    //     },
    //     "moveToPandemic"
    //   )
    //   // fill pandemic mark w/ yellow
    //   .to(declarePandemic, {
    //     opacity: 1,
    //     scaleY: 1,
    //     fill: colors.ylw,
    //   })
    //   // Next caption up, reverse the one before
    //   .to(
    //     chartCaptions[0],
    //     {
    //       opacity: 0,
    //       duration: 5,
    //     },
    //     "swap1"
    //   )
    //   .from(
    //     chartCaptions[1],
    //     {
    //       opacity: 0,
    //       duration: 5,
    //     },
    //     "swap1"
    //   )
    //   .to(declarePandemic, {
    //     duration: 1,
    //   })
    //   .to(
    //     pandemicTillExa,
    //     {
    //       opacity: 1,
    //       scaleY: 1,
    //       duration: 1,
    //       fill: colors.gry,
    //       stagger: {
    //         each: 0.2,
    //       },
    //     },
    //     "moveTillExa"
    //   )
    //   .to(
    //     barChartContainer,
    //     {
    //       x: "-100vw",
    //     },
    //     "moveTillExa"
    //   )
    //   .to(
    //     chartCaptions[1],
    //     {
    //       opacity: 0,
    //       duration: 5,
    //     },
    //     "swap1"
    //   )
    //   .from(
    //     chartCaptions[2],
    //     {
    //       opacity: 0,
    //       duration: 5,
    //     },
    //     "swap1"
    //   );
  }
}
