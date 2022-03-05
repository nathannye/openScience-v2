import data from "./data";
import * as d3 from "d3";
import { gsap } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { axisLeft, xml } from "d3";
import colors from "./colors";

gsap.registerPlugin(ScrollTrigger);

// window.onresize = (event) => {
//   var width = window.innerWidth;
//   console.log(width);
// };

function buildChart() {}

const heightValue = 150;
const widthValue = 1100;

const svg = d3
  .select("#barChartContainer")
  .append("svg")
  .attr("viewBox", `0 0 ${widthValue} ${heightValue}`);

const margin = { top: 0, bottom: 0, left: 0, right: 0 };

const height = 150 - margin.top - margin.bottom;
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

  gsap.set(bars, {
    // opacity: 0,
    scaleY: 0,
    transformOrigin: "center bottom",
  });

  const chartContainer = document.getElementById("chartOfUsers");
  let graphtl = gsap.timeline({
    paused: true,
    scrollTrigger: {
      pin: true,
      scrub: 0.24,
      trigger: chartContainer,
      start: "bottom bottom",
    },
  });

  graphtl
    .to(tillPandemic, {
      opacity: 1,
      scaleY: 1,
      duration: 0.8,
      stagger: {
        each: 0.05,
      },
    })
    .to(declarePandemic, {
      // opacity: 1,
      scaleY: 1,
      duration: 0.2,
    })
    .to(pandemicTillExa, {
      opacity: 1,
    });
}

animateChart();

// let events = [declarePandemic, exascaleMark];

// let obj = document
//   .createElement("div")
//   .setAttribute("class", "eventMarkerThing");

// d3.select("#declarePandemic").node().appendChild(obj);

// gsap.from(bars, {
//   y: function (d) {
//     return y(d.users);
//   },
//   duration: 0.2,
//   transformOrigin: "center 100%",
//   stagger: ".007",
//   scrollTrigger: {
//     trigger: chart,
//     markers: true,
//     start: "top center",
//   },
// });
