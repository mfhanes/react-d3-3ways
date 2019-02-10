import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import { Button, Jumbotron } from "react-bootstrap"

class ChartContainer extends Component {
  constructor() {
    super()
    this.state = {
      dataset: [5, 6, 8, 10, 12, 14, 16, 18, 15, 11]
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const newDataset = []

    while (newDataset.length < 10) {
      newDataset.push(Math.floor(Math.random() * 50))
    }

    this.setState({ dataset: newDataset })
  }

  render() {
    const { children } = this.props
    const { dataset } = this.state

    const childrenAsRoutes = React.Children.map(children, child => {
      return (
        <Route
          path={child.props.path}
          render={props => React.cloneElement(child, { dataset })}
        />
      )
    })

    return (
      <div className="w-50 mx-auto">
        <div className="my-1">
          <Button
            variant="secondary"
            className="my-4"
            onClick={this.handleClick}
          >
            New Props
          </Button>
        </div>
        <div className="border rounded p-2">
          <Route exact path="/" render={() => <Redirect to="/d3" />} />
          {childrenAsRoutes}
        </div>
        <Jumbotron className="mt-3">
          <h3>this.props.dataset:</h3>
					<p>{dataset.join(", ")}</p>
        </Jumbotron>
      </div>
    )
  }
}

export default ChartContainer
