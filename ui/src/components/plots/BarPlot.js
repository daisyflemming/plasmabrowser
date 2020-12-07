import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {create_UUID} from "../utils/commons";
import * as d3 from 'd3';

const data = [12, 5, 6, 6, 9, 10];
const prepareDataPoints = (expressionCounts) =>{
  expressionCounts.map(s => {
    return (
      <div key={'count_' + create_UUID()}>
        &emsp;{"{"}<br/>
        &ensp;&emsp;"count": {s.count},<br/>
        &ensp;&emsp;"name": "{s.name}",<br/>
        &ensp;&emsp;"range": {s.range.map(x =>
        <span key={'range_' + create_UUID()}>
                  {"{"} "start": {x.start}, "end": {x.end} {"}"}
                </span>
      )}<br/>
        &emsp;{"}"},<br/>
      </div>
    )
  })
}

const createBarChart =(svg, data) =>{
  let margin = 100,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;
  let xScale = d3.scaleLinear()
    .domain([d3.min(data, function(d) { return d.range[0].start; }), d3.max(data, function(d) { return d.range[0].start; })])
    .range([0, width])
  let yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.count; })])
    .range([height, 0])
  let g = svg.append("g").attr("transform", "translate(" + 50 + "," + 50 + ")");
  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale).tickFormat(function(d){
      return d;
    }).ticks(5));
  g.append("g")
    .call(d3.axisLeft(yScale).tickFormat(function(d){
      return d;
    }).ticks(5))
    .append("text")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("value");
}

const BarPlot =(props) => {
  const ref = useRef();
  let {expressionCounts, expressionAnnotations} = props;
  useEffect(() => {
    const svg = d3.select(ref.current)
    createBarChart(svg, expressionCounts);
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

