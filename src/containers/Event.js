import React, { Component } from "react"
import {Map} from "google-maps-react";
import logo from "../assets/logo.png"
import { chunk } from "../helpers/utils.js"
import { getEvent, getEventPartecipants, getEventAssets } from "../helpers/api.js"
import { Row, Col } from "react-bootstrap"
class Event extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: "",
      image: "",
      partecipants: [],
      assets: []
    }
  }

  componentDidMount() {
    getEvent(1).then(({ name, description, image }) => this.setState({ name, description, image }))
    getEventPartecipants(1).then(partecipants => this.setState({ partecipants }))
    getEventAssets(1).then(assets => assets.map(({ name }) => (name))).then(assets => this.setState({ assets }))
  }

  render() {
    console.log(this.state.assets)
    return (
      <div id = { "event" }>
        <div id = { "image-container" }><img src = { this.state.image } id = { "image" }/></div>
        <h1>{ this.state.name }</h1>
        <textarea readOnly id = { "description" } value = { this.state.description }/>
          {
            this.state.assets.length ?
              <fieldset>
                <legend>
                  <span className = { "number" }>✤</span> Scegli come contribuire:
                </legend>
                {
                  this.state.assets.map((asset, i) => (
                    <div className = {"inputGroup"}>
                      <input id = {`option-${i + 1}`} type = {"checkbox"}/>
                      <label htmlFor = {`option-${i + 1}`}>{asset}</label>
                    </div>
                  ))
                }
              </fieldset>
            : ""
          }
        <fieldset>
          <legend>
            <span className = { "number" }>✤</span> Partecipanti:
          </legend>
        </fieldset>
        <div id = { "partecipants" }>
          {
            this.state.partecipants.map(partecipant => (
              <img src = { partecipant.image } className = { "profile-pic" }/>
            ))
          }
        </div>
        <div id = { "submit" }>
          <input type="submit" value="Partecipa"/>
        </div>
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
