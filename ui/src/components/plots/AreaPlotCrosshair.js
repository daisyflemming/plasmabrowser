import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';

const createBarChart =(svg, data) =>{
  //credit: based on http://bl.ocks.org/mikehadlow/93b471e569e31af07cd3
  let margin = 100,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

  let xDomain = d3.extent(data, function(d) { return d.x; });
  let yDomain = d3.extent(data, function(d) { return d.y; });

  // set up scale
  const xValues = data.map(d => d.x);
  let xScale = d3.scaleLinear().domain(xDomain).range([0, width])
  let yScale = d3.scaleLinear().domain(yDomain).range([height, 0]);

  // set up x-axis and values
  // limit no. of ticks marks on x-axis
  let spacing = Math.pow(10, Math.floor(Math.log10(Math.max(...xValues))));
  let xAxis = d3.axisBottom(xScale);
  let yAxis = d3.axisLeft(yScale);

  let line = d3.line()
    .x(function(d) { return xScale(d.x); })
    .y(function(d) { return yScale(d.y); });

  let area = d3.area()
    .x(function(d) { return xScale(d.x); })
    .y0(function(d) { return yScale(d.y); })
    .y1(height);

  //assemble the plot
  let g = svg.append("g").attr("transform", "translate(" + 50 + "," + 50 + ")");

  g.append('path')
    .datum(data)
    .attr('class', 'area')
    .attr('d', area);

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

  // add tooltip
  let label = g.append("text")
    .attr("x", width)
    .attr("y", 0)
    .style("text-anchor", "end");

  // add line
  g.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('d', line);

  g.selectAll('circle').data(data).enter().append('circle')
    .attr('cx', function(d) { return xScale(d.x); })
    .attr('cy', function(d) { return yScale(d.y); })
    .attr('r', 1)
    .attr('class', 'circle');

  // focus tracking
  let focus = g.append('g').style('display', 'none');
  focus.append('line')
    .attr('id', 'focusLineX')
    .attr('class', 'focusLine');
  focus.append('line')
    .attr('id', 'focusLineY')
    .attr('class', 'focusLine');
  // focus.append('circle')
  //   .attr('id', 'focusCircle')
  //   .attr('r', 5)
  //   .attr('class', 'circle focusCircle');

  let bisectX = d3.bisector(function(d) { return d.x; }).left;

  g.append("rect")
    .attr("class", "overlay")
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', function() { focus.style('display', null); })
    .on('mouseout', function() { focus.style('display', 'none'); })
    .on('mousemove', function() {
      let mouse = d3.mouse(this);
      let mouseX = xScale.invert(mouse[0]);
      let i = bisectX(data, mouseX); // returns the index to the current data item
      let d = data[i];
      let x = xScale(d.x);
      let y = yScale(d.y);

      focus.select('#focusLineX')
        .attr('x1', x).attr('y1', yScale(yDomain[0]))
        .attr('x2', x).attr('y2', yScale(yDomain[1]));
      focus.select('#focusLineY')
        .attr('x1', xScale(xDomain[0])).attr('y1', y)
        .attr('x2', xScale(xDomain[1])).attr('y2', y);

      label.text(function() {
        return "pos = " + d.x + ", counts = " + d.y;
      });
    });

}

const AreaPlotCrosshair =(props) => {
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

export default connect(mapStateToProps)(AreaPlotCrosshair);

