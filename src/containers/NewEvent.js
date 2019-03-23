import React, { Component } from "react"
import queryString from "query-string"
class NewEvent extends Component {
  constructor() {
    super()
    this.state = {
      lat: null,
      lng: null
    }
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    this.setState({
      lat: urlParams.get("lat"),
      lng: urlParams.get("lng")
    })
  }

  render() {
    return (
      <div>
        <h1>Create new Event</h1>
        <form>
          <span>Name</span><input type="text" /><br />
          <span>Description</span><input type="text" /><br />
          <span>Image</span><input type="file" accept=".jpg"/>
        </form>
      </div>
    )
  }
}

export default NewEvent
