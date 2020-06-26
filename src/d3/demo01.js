import * as d3 from "d3";
window.p = d3.select("body")
  .selectAll("p")
  .data([4, 8, 15, 16, 23, 42])
  .text(function (d) { return d; });


// p.enter().append("p")
//   .text(function (d) { return d; });
p.exit().remove();