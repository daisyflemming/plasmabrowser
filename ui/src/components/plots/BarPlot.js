import React, {Component, useEffect, useRef} from 'react';
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
  svg.append("circle")
    .attr("cx", 150)
    .attr("cy", 70)
    .attr("r",  50)
}

const BarPlot =(props) => {
  const ref = useRef();
  let {expressionCounts, expressionAnnotations} = props;
  useEffect(() => {
    const svg = d3.select(ref.current)
    createBarChart(svg, expressionCounts);
  }, [])

  return(
    <svg ref={ref}></svg>
  )
};


const mapStateToProps = (state, ownProps) => {
  return {
    expressionCounts: state.rootReducer.expressionCounts,
    expressionAnnotations: state.rootReducer.expressionAnnotations,
  }
};

export default connect(mapStateToProps)(BarPlot);

