import React, { Component } from "react"
import { Form } from "react-bootstrap"
import * as d3 from "d3"

class D3Chart extends Component {
  constructor() {
    super()
    this.state = { manualUpdate: false }
    this.drawChart = this.drawChart.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }

  componentDidMount() {
    this.drawChart()
  }

  componentDidUpdate(prevProps) {
    const { manualUpdate } = this.state

    if (manualUpdate && prevProps.dataset !== this.props.dataset) {
      this.drawChart(true)
    }
  }

  handleCheck(e) {
    this.setState(state => {
      return { manualUpdate: !state.manualUpdate }
    })
  }

  drawChart(update = false) {
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

    if (!update) {
      // DOM
      const svg = d3
        .select(this.svg)
        .attr("id", "bar-svg")
        .attr("width", totalW)
        .attr("height", totalH)

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .attr("id", "bar-g")

      // Data Bars
      g.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(i))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => h - yScale(d))
        .attr("fill", d => `rgb(150, 0, ${d * 5})`)
        .attr("rx", 3)

      // Labels
      g.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(d => d)
        .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d) + 15)
        .attr("font-size", "11px")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
    } else {
      const g = d3.select("#bar-g")

      // Data Bars
      g.selectAll("rect")
        .data(dataset)
        .transition()
        .delay((d, i) => (i / 10) * 1000)
        .duration(500)
        .attr("y", d => yScale(d))
        .attr("height", d => h - yScale(d))
        .attr("fill", d => `rgb(150, 0, ${d * 5})`)

      // Labels
      g.selectAll("text")
        .data(dataset)
        .transition()
        .delay((d, i) => (i / 10) * 1000)
        .duration(500)
        .text(d => d)
        .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d) + 15)
    }
  }

  render() {
    return (
      <div>
        <Form.Check
          className="position-absolute ml-3 mt-1"
          label="Force Update"
          onClick={this.handleCheck}
        />
        <svg className="d-block mx-auto" ref={el => (this.svg = el)} />
      </div>
    )
  }
}

export default D3Chart
