import React, { Component } from "react"
import {Map} from "google-maps-react";
import logo from "../assets/logo.png"
class Event extends Component {
  render() {
    return (
      <div id = { "event" }>
        <img src = { logo }/>
        <h1>Titolo</h1>
        <textarea readOnly id = { "description" }>Ciao</textarea>
        <fieldset>
          <legend>
            <span className = { "number" }>1</span> Scegli come contribuire:
          </legend>
          <input type = "checkbox"/>
        </fieldset>
        <fieldset>
          <legend>
            <span className = { "number" }>2</span> Partecipanti:
          </legend>
        </fieldset>
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
