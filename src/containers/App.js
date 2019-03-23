import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { apiKey } from "../const"
import { styles } from "../styleMap"
import { Link } from "react-router-dom"
import { InfoWindowEx as InfoWindow } from "./InfoWindowEx"

class App extends Component {
  constructor() {
    super()
    this.state = {
      markers: [],
      infoLat: 44.708408,
      infoLng: 10.623389
    }
    this.handleMapClick = this.handleMapClick.bind(this)
  }

  fakeEvents = [
    { lat: 44.708408, lng: 10.623389, title: "Pizzata" },
    { lat: 44.694094, lng: 10.616430, title: "Cena" },
    { lat: 44.688608, lng: 10.638696, title: "Partita bella" },
    { lat: 44.702015, lng: 10.648172, title: "Kangarou" },
    { lat: 44.694285, lng: 10.635184, title: "Evento Divertente" },
    { lat: 44.695742, lng: 10.632566, title: "Nonna clustrofobica" },
    { lat: 44.697328, lng: 10.628811, title: "Ajeje Brazorf" },
    { lat: 44.698457, lng: 10.625238, title: "Guatemala" },
    { lat: 44.6985847, lng: 10.6239762, title: "Pinnacolo" },
    { lat: 44.6983888, lng: 10.6240057, title: "Bosnia" },
  ]


  componentDidMount() {
    this.setState({ markers: this.fakeEvents })
  }

  handleMapClick = (mapProps, map, clickEvent) => {
    this.setState({
      infoLat: clickEvent.latLng.lat(),
      infoLng: clickEvent.latLng.lng(),
      infoShow: true
    })

  }

  render() {
    return (
      <Map google={this.props.google} className="mainMap"
        zoom={15}
        minZoom={11}
        initialCenter={{
          lat: 44.697926,
          lng: 10.630456
        }}
        onClick={this.handleMapClick}
        styles={styles}
        >
        <InfoWindow
          position={{
            lat: this.state.infoLat,
            lng: this.state.infoLng,
            infoShow: true
          }}
          visible = { this.state.infoShow }
          >
          <input type="button" value="Add new Event" onClick={() => this.props.history.push(`/new-event?lat=${this.state.infoLat}&lng=${this.state.infoLng}`)} />
        </InfoWindow>

        {
          this.state.markers.map((e, i) => {
          //   console.log(e);
            return(
                <Marker
                  key={i}
                  title={ e.title }
                  name={ e.title }
                  position={{lat: e.lat, lng: e.lng}}
                  onClick={() => this.props.history.push(`/event/${e.title}`)}
                  />
          )
          // return <p>ciao</p>
        })
        }
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey,
  styles
})(App)
