import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';

const createBarChart =(svg, data) =>{
  let margin = 100,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

  const xScaleValue = data.reduce((acc, curr) => {
    return acc + curr.x
  }, 0)

  let xScale = d3.scaleLinear()
    .domain([
      d3.min(data, function(d) { return d.x; }),
      d3.max(data, function(d) { return d.x; })
    ])
    .range([0, width])
  let yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.y; })])
    .range([height, 0])
  let g = svg.append("g").attr("transform", "translate(" + 50 + "," + 50 + ")");
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
    .attr("x", function(d) { return xScale(d.x); })
    .attr("y", function(d) { return yScale(d.y); })
    .attr("width", function(d) { return xScale(d.width); })
    .attr("height", function(d) { return height - yScale(d.y); });
}

const BarPlot =(props) => {
  const ref = useRef();
  let {expressionCounts, expressionAnnotations} = props;
  let data = [];
  expressionCounts.map(s => {
    data.push({x: s.range[0].start, y: s.count, width: s.range[0].end})
  });
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

