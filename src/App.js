import React, { Component } from "react"
import {
  Navbar,
  ChartContainer,
  D3Chart,
  ReactChart,
  HybridChart
} from "./components"
import { BrowserRouter as Router } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <ChartContainer>
            <D3Chart path="/d3" />
            <ReactChart path="/react" />
            <HybridChart path="/hybrid" />
          </ChartContainer>
        </div>
      </Router>
    )
  }
}

export default App
