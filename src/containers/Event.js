import React, { Component } from "react"
import {Map} from "google-maps-react";
import logo from "../assets/logo.png"
import { chunk } from "../helpers/utils.js"
import { getEvent, getEventPartecipants } from "../helpers/api.js"
import { Row, Col } from "react-bootstrap"
class Event extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: "",
      image: "",
      partecipants: []
    }
  }

  componentDidMount() {
    getEvent(1).then(({ name, description, image }) => this.setState({ name, description, image }))
    getEventPartecipants(1).then(partecipants => this.setState({ partecipants }))
  }

  render() {
    console.log(this.state.partecipants)
    return (
      <div id = { "event" }>
        <div id = { "image-container" }><img src = { this.state.image } id = { "image" }/></div>
        <h1>{ this.state.name }</h1>
        <textarea readOnly id = { "description" } value = { this.state.description }></textarea>
        <fieldset>
          <legend>
            <span className = { "number" }>1</span> Scegli come contribuire:
          </legend>
          <div className="inputGroup">
            <input id="option1" name="option1" type="checkbox"/>
            <label htmlFor="option1">Option One</label>
          </div>
          <div className="inputGroup">
            <input id="option2" name="option2" type="checkbox"/>
            <label htmlFor="option2">Option Two</label>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <span className = { "number" }>2</span> Partecipanti:
          </legend>
        </fieldset>
        {
          this.state.partecipants.map(partecipant => (
            <img src = { partecipant.name }/>
          ))
        }
        {/*
        <Map
            google = { this.props.google }
            style = {{ width: "400px", height: "400px", borderRadius: "50%" }}
            zoom = { 15 }
            minZoom = { 11 }
            initialCenter = {{
              lat,
              lng
            }}
        />*/}
      </div>
    )
  }
}

export default Event
