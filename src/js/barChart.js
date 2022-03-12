import data from "./data";
import * as d3 from "d3";
import gsap from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
import colors from "./colors";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const heightValue = 325;
const widthValue = 1100;

const svg = d3
  .select("#barChartContainer")
  .append("svg")
  .attr("viewBox", `0 0 ${widthValue} ${heightValue}`);

const margin = { top: 0, bottom: 0, left: 0, right: 0 };

const height = 325 - margin.top - margin.bottom;
const width = 1100 - margin.left - margin.right;

const x = d3
  .scaleBand()
  .domain(d3.range(data.length))
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
  .data(data.sort((a, b) => d3.ascending(a.users, b.users)))
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

// function xAxis(g) {
//   g.attr("transform", `translate(0, ${height - margin.bottom})`)
//     .attr("id", "xAxis")
//     .call(d3.axisBottom(x).tickFormat((i) => data[i].date));
// }

// function yAxis(g) {
//   g.attr("transform", `translate(${margin.left}, 0)`)
//     .attr("id", "yAxis")
//     .call(d3.axisLeft(y).ticks(null, data.format));
// }
// svg.append("g").call(yAxis);
// svg.append("g").call(xAxis);
svg.node();

let bars = gsap.utils.toArray("rect.bar");

// let chart = document.querySelector("#barChartContainer");

// // Event Markers
let declarePandemic = bars[8];
let exascaleMark = bars[bars.length - 1];
declarePandemic.setAttribute("id", "pandemicDeclaredMark");
declarePandemic.setAttribute("class", "eventMarker");
exascaleMark.setAttribute("id", "exascaleMark");
exascaleMark.setAttribute("class", "eventMarker");

function animateChart() {
  let tillPandemic = bars.slice(0, 8);
  let pandemicTillExa = bars.slice(9, bars.length);
  let chartCaptions = document.querySelectorAll("#chartCaptionContainer > h2");
  let introCaption = chartCaptions[0];
  let pandemicCaption = chartCaptions[1];
  let exaCaption = chartCaptions[2];
  let chartSectionContainer = document.getElementById("chartOfUsers");
  let barChartContainer = document.getElementById("barChartContainer");

  chartCaptions.forEach((caption) => {
    caption.split = new SplitText(caption, {
      type: "words, lines",
      linesClass: "splitLine",
    });

    gsap.set(caption.split.words, {
      yPercent: 100,
    });

    caption.tl = gsap.timeline({
      paused: true,
    });

    caption.tl.to(
      caption.split.words,
      {
        yPercent: 0,
        duration: 0.65,
        ease: "power3.inOut",
        stagger: 0.02,
      },
      "splitIn"
    );
  });

  gsap.set(bars, {
    opacity: 0,
    fill: colors.teal,
    scaleY: 0.35,
    transformOrigin: "center bottom",
  });

  let graphtl = gsap.timeline({
    paused: true,
    scrollTrigger: {
      pin: true,
      scrub: 0.35,
      trigger: chartSectionContainer,
      start: "bottom bottom",
    },
  });

  graphtl
    .call(function () {
      if (graphtl.reversed(true)) {
        introCaption.tl.reverse();
      } else {
        introCaption.tl.play();
      }
    })
    .to(tillPandemic, {
      opacity: 1,
      scaleY: 1,
      delay: 80,
      duration: 40,
      fill: colors.gry,
      stagger: {
        each: 12,
      },
    })
    .call(
      function () {
        if (graphtl.reversed(true)) {
          pandemicCaption.tl.reverse();
          introCaption.tl.play();
        } else {
          introCaption.tl.reverse();
          pandemicCaption.tl.play();
        }
      },
      null,
      "pandemic"
    )
    .to(
      declarePandemic,
      {
        opacity: 1,
        delay: 7,
        scaleY: 1,
        fill: colors.ylw,
        duration: 17,
      },
      "pandemic"
    )
    .to(
      declarePandemic,
      {
        duration: 10,
      },
      "next"
    )
    .to(
      pandemicTillExa,
      {
        opacity: 1,
        scaleY: 1,
        delay: 70,
        duration: 65,
        fill: colors.gry,
        stagger: {
          each: 5,
        },
      },
      "next"
    )
    .call(function () {
      if (graphtl.reversed(true)) {
        exaCaption.tl.reverse();
        pandemicCaption.tl.play();
      } else {
        pandemicCaption.tl.reverse();
        exaCaption.tl.play();
      }
    })
    .to(
      barChartContainer,
      {
        x: "-100vw",
        delay: 160,
        ease: "power2.inOut",
        duration: 200,
      },
      "next"
    );
}

animateChart();
