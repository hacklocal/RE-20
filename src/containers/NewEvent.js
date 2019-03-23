import React, { Component } from "react"
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { apiKey } from "../const"
import queryString from "query-string"
class NewEvent extends Component {
  constructor(props) {
    super(props)
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
    const { lat, lng } = this.state
    return (
      <div id = { "new-event" }>
        <form>
          <div id = { "form" }>
            <form>
              <fieldset>
                <legend>
                  <span className = { "number" }>1</span> Informazioni:
                </legend>
                <input type = { "text" } placeholder = { "Nome" }/>
                <textarea placeholder = { "Descrizione" }/>
              </fieldset>
              <fieldset>
                <legend>
                  <span className = { "number" }>2</span> Informazioni aggiuntive:
                </legend>
              </fieldset>
              <fieldset>
                <legend>
                  <span className="number">3</span> Immagine:
                </legend>
                <input type = { "file" } />
              </fieldset>
              <input type="submit" value="Submit"/>
              <Map
                google = { this.props.google }
                style = {{ width: "400px", height: "400px", borderRadius: "50%" }}
                zoom = { 15 }
                minZoom = { 11 }
                initialCenter = {{
                  lat,
                  lng
                }}
              />
            </form>
          </div>
        </form>
      </div>
    )
  }
}
export default GoogleApiWrapper({ apiKey })(NewEvent)
