import React, { Component } from "react"
import { Link } from 'react-router-dom'

class Event extends Component {
  render() {
    return (
      <div>
        <h1>ID: { this.props.match.params.eventName }</h1>
      </div>
    )
  }
}

export default Event
