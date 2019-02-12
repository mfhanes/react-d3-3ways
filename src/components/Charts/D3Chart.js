import React, { Component } from "react"
import { Form } from "react-bootstrap"
import * as d3 from "d3"

class D3Chart extends Component {
  constructor() {
    super()
    this.state = { forceUpdate: false }
    this.drawChart = this.drawChart.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.updateChart = this.updateChart.bind(this)

    // Dimensions
    this.totalW = 600
    this.totalH = 300
    this.margin = {
      top: 5,
      bottom: 5,
      left: 5,
      right: 5
    }
    this.w = this.totalW - this.margin.left - this.margin.right
    this.h = this.totalH - this.margin.top - this.margin.bottom

    // Scales
    this.xScale = d3
      .scaleBand()
      .domain(d3.range(10))
      .rangeRound([0, this.w])
      .paddingInner(0.05)
    this.yScale = d3
      .scaleLinear()
      .domain([0, 50])
      .range([this.h, 0])
  }

  componentDidMount() {
    this.drawChart()
  }

  componentDidUpdate(prevProps) {
    const { forceUpdate } = this.state

    if (forceUpdate && prevProps.dataset !== this.props.dataset) {
      this.updateChart()
    }
  }

  handleCheck(e) {
    this.setState(state => {
      return { forceUpdate: !state.forceUpdate }
    })
  }

  drawChart() {
    const { dataset } = this.props
    const { totalW, totalH, margin, xScale, yScale, h } = this

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
  }

  updateChart() {
    const { dataset } = this.props
    const { xScale, yScale, h } = this
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
