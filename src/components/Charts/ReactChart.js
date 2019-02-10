import React, { Component } from "react"
import * as d3 from "d3"

class ReactChart extends Component {
  render() {
    // Data
    const { dataset } = this.props

    // Dimensions
    const totalW = 600
    const totalH = 300
    const margin = {
      top: 5,
      bottom: 5,
      left: 5,
      right: 5
    }
    const w = totalW - margin.left - margin.right
    const h = totalH - margin.top - margin.bottom

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(d3.range(dataset.length))
      .rangeRound([0, w])
      .paddingInner(0.05)
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([h, 0])

    return (
      <svg
        className="d-block mx-auto"
        id="bar-svg"
        width={totalW}
        height={totalH}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`} id="bar-g">
          {dataset.map((d, i) => (
            <rect
              key={`${i}-${d}-bar`}
              x={xScale(i)}
              y={yScale(d)}
              width={xScale.bandwidth()}
              height={h - yScale(d)}
              fill={`rgb(150, 0, ${d * 5})`}
              rx={3}
            />
          ))}
          {dataset.map((d, i) => (
            <text
              key={`${i}-${d}-text`}
              x={xScale(i) + xScale.bandwidth() / 2}
              y={yScale(d) + 15}
              fontSize="11px"
              fill="white"
              textAnchor="middle"
            >
              {d}
            </text>
          ))}
        </g>
      </svg>
    )
  }
}

export default ReactChart
