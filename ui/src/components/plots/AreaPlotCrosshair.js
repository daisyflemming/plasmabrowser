import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';

const createStackedBar =(svg, data) =>{
  let margin = svg.attr('margin'),
    width = svg.attr('width') - margin,
    height = (svg.attr('height') - margin)*0.2;

  // set up domain
  const xDomain = [0, d3.max(data, function(d) { return d.total; })];
  const yDomain = data.map(function(d) { return d.gene; })
  const keys = ['bar1', 'bar2']

  // set up scale
  let xScale = d3.scaleLinear().domain(xDomain).rangeRound([0, width]).domain(xDomain).nice();
  let yScale = d3.scaleBand().range([0, height]).paddingInner(0.05).align(0.1).domain(yDomain);
  let zScale = d3.scaleOrdinal().range(['#ffffff', '#98abc5']).domain(keys);

  //assemble the plot
  let g = svg.append('g').attr('transform', 'translate(' + margin*0.75  + ', 0)');

  g.append('g')
    .selectAll('g')
    .data(d3.stack().keys(keys)(data))
    .enter().append('g')
    .attr('fill', function(d) { return zScale(d.key); })
    .selectAll('rect')
    .data(function(d) { return d; })
    .enter().append('rect')
    .attr('y', function(d) { return yScale(d.data.gene); })
    .attr('x', function(d) { return xScale(d[0]); })
    .attr('width', function(d) { return xScale(d[1]) - xScale(d[0]); })
    .attr('height', yScale.bandwidth());
  g.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,0)')
    .call(d3.axisLeft(yScale));

  //remove x-axis
  // g.append('g')
  //   .attr('class', 'axis')
  //   .attr('transform', 'translate(0,'+height+')')
  //   .call(d3.axisBottom(xScale))
}

const createBarChart =(svg, data) =>{
  //credit: http://bl.ocks.org/mikehadlow/93b471e569e31af07cd3
  let margin = svg.attr('margin'),
    width = svg.attr('width') - margin,
    height = svg.attr('height') - margin;

  let xDomain = [0, d3.max(data, function(d) { return d.x; })];
  let yDomain = [0, d3.max(data, function(d) { return d.y; })];

  // set up scale
  let xScale = d3.scaleLinear().domain(xDomain).range([0, width])
  let yScale = d3.scaleLinear().domain(yDomain).range([height, 0]);

  // set up x-axis and values
  // limit no. of ticks marks on x-axis
  let xAxis = d3.axisBottom(xScale);
  let yAxis = d3.axisLeft(yScale);

  let line = d3.line()
    .x(function(d) { return xScale(d.x); })
    .y(function(d) { return yScale(d.y); });

  let area = d3.area()
    .x(function(d) { return xScale(d.x); })
    .y0(function(d) { return yScale(d.y); })
    .y1(height);

  //assemble the plot, push the plot down
  let g = svg.append('g').attr('transform', 'translate(' + margin*0.75 + ',' + margin*0.75 + ')');

  g.append('path')
    .datum(data)
    .attr('class', 'area')
    .attr('d', area);

  g.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);
  g.append('g')
    .call(yAxis)
    .append('text')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('text-anchor', 'end')
    .text('value');

  // add tooltip
  let label = g.append('text')
    .attr('x', width)
    .attr('y', 0)
    .style('text-anchor', 'end');

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

  let bisectX = d3.bisector(function(d) { return d.x; }).left;

  g.append('rect')
    .attr('class', 'overlay')
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', function() { focus.style('display', null); })
    .on('mouseout', function() { focus.style('display', 'none'); })
    .on('mousemove', function() {
      let mouse = d3.mouse(this);
      let mouseX = xScale.invert(mouse[0]);
      let i = bisectX(data, mouseX); // returns the index to the current data item
      let d = data[i];
      if (d) {
        let x = xScale(d.x);
        let y = yScale(d.y);

        focus.select('#focusLineX')
          .attr('x1', x).attr('y1', yScale(yDomain[0]))
          .attr('x2', x).attr('y2', yScale(yDomain[1]));
        focus.select('#focusLineY')
          .attr('x1', xScale(xDomain[0])).attr('y1', y)
          .attr('x2', xScale(xDomain[1])).attr('y2', y);

        label.text(function () {
          return 'pos = ' + d.x + ', counts = ' + d.y;
        });
      }
    });

}

const AreaPlotCrosshair =(props) => {
  const ref = useRef();
  const refBar = useRef();

  let {expressionCounts, expressionAnnotations} = props;
  let data = [], annotations = [];
  expressionCounts.map(s => {
    let count = s.count;
    let start = s.range[0].start;
    let width = s.range[0].end - start+1;
    for (let i=0; i<width; i++) {
      data.push({ x: start+i, y: count})
    }
  });
  expressionAnnotations[0].map(s => {
    let gene = s.Gene;
    let total = s.range[0].end;
    let bar1 = s.range[0].start;
    let bar2 = s.range[0].end - bar1;
    annotations.push({ gene: gene, bar1: bar1, bar2: bar2, total: total})
  })

  useEffect(() => {
    const svg = d3.select(ref.current)
    createBarChart(svg, data);
    const svg1 = d3.select(refBar.current)
    createStackedBar(svg1, annotations);
  }, [])

  return(
    <div>
    <svg ref={ref} width={500} height={370} margin={100}></svg>
    <svg ref={refBar} width={500} height={300} margin={100}></svg>
    </div>
  )
};


const mapStateToProps = (state, ownProps) => {
  return {
    expressionCounts: state.rootReducer.expressionCounts,
    expressionAnnotations: state.rootReducer.expressionAnnotations,
  }
};

export default connect(mapStateToProps)(AreaPlotCrosshair);

