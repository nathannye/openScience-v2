import data from "./data";
import * as d3 from "d3";
import { gsap } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { axisLeft, xml } from "d3";

gsap.registerPlugin(ScrollTrigger);

const teal = "#13f1df";
const ylw = "#FFE65C";
const blue = "#001f4e";
const white = "white";

var width = window.innerWidth;

window.onresize = (event) => {
  var width = window.innerWidth;
};

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
  .attr("fill", ylw)
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

function xAxis(g) {
  g.attr("transform", `translate(0, ${height - margin.bottom})`)
    .attr("id", "xAxis")
    .call(d3.axisBottom(x).tickFormat((i) => data[i].date));
}

function yAxis(g) {
  g.attr("transform", `translate(${margin.left}, 0)`)
    .attr("id", "yAxis")
    .call(d3.axisLeft(y).ticks(null, data.format));
}
svg.append("g").call(yAxis);
svg.append("g").call(xAxis);
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

d3.select("rect#exascaleMark")
  .append("foreignObject")
  .attr("x", 100)
  .attr("y", 100)
  .attr("width", 40)
  .attr("height", 60)
  .append("xhtml:body")
  .html("PLEASE JESUS <br> WORK");

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
