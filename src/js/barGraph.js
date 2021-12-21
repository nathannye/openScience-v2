import * as d3 from "d3";
import "regenerator-runtime/runtime";

function main() {
  var svg = d3.select("svg#barGraph"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

  var xScale = d3.scaleBand().range([0, width]).padding(0.4),
    yScale = d3.scaleLinear().range([height, 0]);

  var g = svg
    .append("g")
    .attr("transform", "translate(" + 100 + ", " + 100 + ")");

  d3.csv("CovidCases_vs_FoldingUsers.csv").then(function (data) {
    xScale.domain(
      data.map(function (d) {
        return d.dates;
      }),
      yScale.domain([
        0,
        d3.max(data, function (d) {
          return d.cases;
        }),
      ]),
      g
        .append("g")
        .attr("transform", "transform(0," + height + "0")
        .call(d3.axisBottom(xScale)),

      g.append("g").call(d3.axisLeft(yScale).tickFormat(d3.format(".1e")))
    );
  });
}
