import Component from "../classes/Component";

export default class Graph extends Component {
  constructor() {
    super({
      element: "",
      elements: {},
    });
  }

  create() {
    super.create();
    this.createChart();
  }

  createChart() {
    const heightValue = 325;
    const widthValue = 900;

    const svg = d3
      .select("#barChartContainer")
      .append("svg")
      .attr("viewBox", `0 0 ${widthValue} ${heightValue}`);

    const margin = { top: 0, bottom: 0, left: 0, right: 0 };

    const height = 325 - margin.top - margin.bottom;
    const width = 900 - margin.left - margin.right;

    const x = d3
      .scaleBand()
      .domain(d3.range(chart.length))
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
      .data(chart.sort((a, b) => d3.ascending(a.users, b.users)))
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
  }
}
