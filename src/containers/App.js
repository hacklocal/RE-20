import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { Link } from "react-router-dom"
import { apiKey, image } from "../const"
import { styles } from "../styleMap"
import { InfoWindowEx as InfoWindow } from "./InfoWindowEx"
import DayPicker from 'react-day-picker';

import 'react-day-picker/lib/style.css';


class App extends Component {
  constructor() {
    super()
    this.state = {
      markers: [],
      infoLat: 44.708408,
      infoLng: 10.623389,
      newEvent: false,
      removed: null,
      image: null
    }
    this.handleMapClick = this.handleMapClick.bind(this)
    this.onMarkerClick = this.onMarkerClick.bind(this)
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
    this.setState({
      markers: this.fakeEvents,
      image
     })
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      infoLat: marker.position.lat(),
      infoLng: marker.position.lng(),
      infoShow: true,
      newEvent: false,
      removed: marker.title
    })
  }

  handleMapClick = (mapProps, map, clickEvent) => {
    this.setState({
      infoLat: clickEvent.latLng.lat(),
      infoLng: clickEvent.latLng.lng(),
      infoShow: true,
      newEvent: true,
      removed: null
    })
  }

  render() {
    return (
      <div>
        <div className="navBar">
          <h2>Filter Event</h2>
          <input type="text" placeholder="search..."/>
          <DayPicker />
          {
            this.state.markers.map(e => (
              <div>
                <h3>{ e.title }</h3>
              </div>
            ))
          }
        </div>
        <Map
          google={ this.props.google }
          className="mainMap"
          zoom={ 15 }
          minZoom={ 11 }
          initialCenter={{
            lat: 44.697926,
            lng: 10.630456
          }}
          onClick={ this.handleMapClick }
          styles={ styles }
          disableDefaultUI = { true }
          >
          <InfoWindow
            position={{
              lat: this.state.infoLat,
              lng: this.state.infoLng,
              infoShow: true
            }}
            visible = { this.state.infoShow }
            >
            {
              this.state.newEvent ?
                <input type="button" value="Add new Event" onClick={() => this.props.history.push(`/new-event?lat=${this.state.infoLat}&lng=${this.state.infoLng}`)} />
                :
                <div onClick={() => this.props.history.push(`/event/${this.state.removed}`)}>
                  <img src = {`data:image/png;base64, ${this.state.image}`}/><span>{this.state.removed}</span>
                </div>
            }
          </InfoWindow>

          {
            this.state.markers.filter(e => this.state.removed !== e.title).map((e, i) => {
              return(
                  <Marker
                    key = { i }
                    title = { e.title }
                    name = { e.title }
                    position = {{lat: e.lat, lng: e.lng}}
                    onClick = { this.onMarkerClick }
                    />
            )
          })
          }
        </Map>
    </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey
})(App)
