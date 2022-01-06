import data from "./data";
import * as d3 from "d3";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { axisLeft } from "d3";

const width = 800;
const height = 400;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

const svg = d3
  .select("#barChartContainer")
  .append("svg")
  .attr("height", height - margin.top - margin.bottom)
  .attr("width", width - margin.left - margin.top)
  .attr("viewbox", [0, 0, width, height]);

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
  .attr("fill", "yellow")
  .selectAll("rect")
  .data(data.sort((a, b) => d3.ascending(a.users, b.users)))
  .join("rect")
  .attr("x", (d, i) => x(i))
  .attr("y", (d) => y(d.users))
  .attr("height", (d) => y(0) - y(d.users))
  .attr("width", x.bandwidth());

function xAxis(g) {
  g.attr("transform", `translate(0, ${height - margin.bottom})`).call(
    d3
      .axisBottom(x)
      .tickFormat((i) => data[i].date)
      .ticks(5)
  );
}

function yAxis(g) {
  g.attr('transform', `translate(${margin.left}, 0)`).call(d3.axisLeft(y).tacks(null, data.format))
}

svg.append("g").call(xAxis);
svg.node();

// let bars = gsap.utils.toArray("#barChartContainer > svg > g > rect");
// let chart = document.querySelector("#barChartContainer");

// document.addEventListener("DOMContentReady", (event) => {
//   gsap.from(bars, {
//     height: 0,
//     duration: 0.2,
//     stagger: ".04",
//     scrollTrigger: {
//       trigger: chart,
//       markers: true,
//       start: "top center",
//     },
//   });
// });
