import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';

const createBarChart =(svg, data) =>{
  let margin = 100,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

  const xValues = data.map(d => d.x);
  let xScale = d3.scaleBand()
    .domain(xValues)
    .range([0, width])
    .padding(0.4);
  let yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.y; })])
    .range([height, 0])
  let g = svg.append("g").attr("transform", "translate(" + 50 + "," + 50 + ")");
  console.log(xScale.bandwidth())
  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale).tickFormat(function(d){
      return d;
    }).ticks(10));
  g.append("g")
    .call(d3.axisLeft(yScale).tickFormat(function(d){
      return d;
    }).ticks(5))
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
    .attr("x", function(d) { return xScale(d.x); })
    .attr("y", function(d) { return yScale(d.y); })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return height - yScale(d.y); });
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

