import * as d3 from "d3";
import "regenerator-runtime/runtime";

var svg = d3.select("svg#barGraph");
var margin = 200;
var width = svg.attr("width") - margin;
var height = svg.attr("height") - margin;

var xScale = d3.scaleBand().range([0, width]).padding(0.4);
var yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

d3.csv("../foldingUsers_v_Days.csv").then(function (data) {
  xScale.domain(
    data.map(function (d) {
      return data.date;
    })
  );
  yScale.domain([
    0,
    d3.max(data, function (d) {
      return d.users;
    }),
  ]);

  g.append("g")
    .attr("transform", "translate(0," + height + "0)")
    .call(d3.axisBottom(xScale));

  g.append("g").call(
    d3
      .axisLeft(yScale)
      .tickFormat(function (d) {
        return "$" + d;
      })
      .ticks(10)
  );

  g.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (d) {
      return xScale(d.date);
    })
    .attr("y", function (d) {
      return yScale(d.users);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return height - yScale(d.users);
    });
});
