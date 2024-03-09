import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const LineChart = ({data, frameClick, videoUrl}) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  useEffect(() => {
    // setting up svg
    const w = 800;
    const h = 500;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("background", "#c5f6fa")

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length ])
      .range([0, w]);

    const yScale = d3.scaleLinear().domain([0, 105]).range([h, 0]);

    const generateScaledLine = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveCardinal);

    
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5 + data.length)
      

    const yAxis = d3.axisLeft(yScale).ticks(data.length);
    
    svg.append("g").call(xAxis).attr("transform", `translate(0,${h})`);
    svg.append("g").call(yAxis);

    // setting up the data for the svg
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("d", (d) => generateScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "black");

      svg
      .selectAll('.circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 2)
      .attr('fill', 'red')
      .attr('stroke', 'none')
      .on('mouseover', (event, d) => {
        tooltipRef.current.style.display = 'block';
        tooltipRef.current.style.left = event.pageX + 'px';
        tooltipRef.current.style.top = event.pageY + 'px';
        tooltipRef.current.textContent = `Value: ${d.y}`;
      })
      .on('mouseout', () => {
        tooltipRef.current.style.display = 'none';
      })
      .on('click', (event, d) => {
        frameClick(d);
      });

      svg
      .append('text')
      .attr('x', w / 2)
      .attr('y', h + 40)
      .style('text-anchor', 'middle')
      .text('Frame Difference (F2 - F1)');

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -h / 2)
      .attr('y', -30)
      .style('text-anchor', 'middle')
      .text('% Change in Values');

    svg
      .append('text')
      .attr('x', w / 2)
      .attr('y', 30)
      .style('text-anchor', 'middle')
      .style('font-size', '18px')
      .text('Frame Change Plot');
  }, [data]);

  return (
    <div className='flex1'>
        {videoUrl ?
        <div>
        <div style={{ overflowX: 'auto' }}>
        <svg ref={svgRef} style={{ margin: "80px", display: "block" }}></svg>
        </div>
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            display: 'none',
            padding: '5px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            borderRadius: '5px',
            pointerEvents: 'none',
          }}
        ></div> 
        </div>:
        <div className='Empty-graph-container'>
          <h3>Upload a video to view graph</h3>
          </div>}
    </div>
  );
};

export default LineChart;

