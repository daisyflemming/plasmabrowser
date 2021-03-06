import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';


const createBarChart =(svg, data) => {
  let margin = 100,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

  // set up x-axis and values
  const xValues = data.map(d => d.x);
  let xScale = d3.scaleBand()
    .domain(xValues)
    .range([0, width])
    .padding(0.1);
  // limit no. of ticks marks on x-axis
  let spacing = Math.pow(10, Math.floor(Math.log10(Math.max(...xValues))));
  let xAxis = d3.axisBottom(xScale)
    .tickValues(xScale.domain().filter(function (d, i) {
      return !(i % spacing)
    }));

  // set up y-axis and values
  let yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) {
      return d.y;
    })])
    .range([height, 0])
  let yAxis = d3.axisLeft(yScale).tickFormat(function (d) {
    return d;
  }).ticks(5);

  let zoom = d3.zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on("zoom", zoomed);

  function zoomed(event) {
    xScale.range([0, width].map(d => {alert(d);event.transform.applyX(d)}));
    svg.selectAll(".bar rect").attr("x", d => xScale(d.x)).attr("width", xScale.bandwidth());
    svg.selectAll(".x-axis").call(xAxis);
  }

  //assemble the plot
  let g = svg.append("g").attr("transform", "translate(" + margin / 2 + "," + margin / 2 + ")");
  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  g.append("g")
    .call(yAxis)
    .append("text")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("value");
  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("fill", "#ad1457")
    .attr("x", function (d) {
      return xScale(d.x);
    })
    .attr("y", function (d) {
      return yScale(d.y);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return height - yScale(d.y);
    })
    .call(zoom);


}

const BarPlot =(props) => {
  const ref = useRef();
  let {expressionCounts, expressionAnnotations} = props;
  let data = [];
  expressionCounts.map(s => {
    let count = s.count;
    let start = s.range[0].start;
    let width = s.range[0].end - start+1;
    for (let i=0; i<width; i++) {
      data.push({ x: start+i, y: count})
    }
  })
  useEffect(() => {
    const svg = d3.select(ref.current)
    createBarChart(svg, data);
  }, [])

  return(
    <svg ref={ref} width={500} height={400}></svg>
  )
};


const mapStateToProps = (state, ownProps) => {
  return {
    expressionCounts: state.rootReducer.expressionCounts,
    expressionAnnotations: state.rootReducer.expressionAnnotations,
  }
};

export default connect(mapStateToProps)(BarPlot);

