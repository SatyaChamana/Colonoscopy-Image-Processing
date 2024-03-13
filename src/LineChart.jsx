import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './CSS/LineChart.css'

const LineChart = ({frameClick, framesData}) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const data = framesData;

  useEffect(() => {
    // Set up SVG dimensions and margins
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = data.length * 6 - margin.left - margin.right; // Adjusted width
    const height = 500 - margin.top - margin.bottom;

    // Append SVG element
    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scales
    const xScale = d3.scaleLinear()
      .domain([0, data.length + 1  ]) // Adjusted domain to keep scale from 0 to 600
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    // Define line function
    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveCardinal);

    // Append line to SVG
    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2);

    // Append x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    // Append y-axis
    svg.append("g")
      .call(d3.axisLeft(yScale));

      svg
      .selectAll('.circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 3)
      .attr('fill', 'black')
      .attr('stroke', 'none')
      .on('mouseover', (event, d) => {
        tooltipRef.current.style.display = 'block';
        tooltipRef.current.style.left = event.pageX + 'px';
        tooltipRef.current.style.top = event.pageY + 'px';
        tooltipRef.current.textContent = `Value: ${d.y}, frame: ${d.x}`;
      })
      .on('mouseout', () => {
        tooltipRef.current.style.display = 'none';
      })
      .on('click', (event, d) => {
        frameClick(d);
      });
  }, [data]);
  return (
    <div className='lineChartContainer flex1' >
      <svg ref={svgRef}></svg>
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
    </div>
  );
};

export default LineChart;
