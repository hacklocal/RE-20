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
      removed: [],
      image: null,
      removedId: null
    }
    this.handleMapClick = this.handleMapClick.bind(this)
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
  }

  componentDidMount() {
    fetch("http://192.168.43.212:8000/api/events")
      .then(res => res.json())
      .then(data => {
        const markers = data.map(e => ({
          title: e.name,
          lat: parseFloat(e.latitude),
          lng: parseFloat(e.longitude),
          start: e.startTime,
          end: e.endTime,
          id: e.id
        }))

        this.setState({
          markers,
          image
        })
    })
  }

  onMarkerClick = (marker) => {
    this.setState({
      infoLat: marker.lat,
      infoLng: marker.lng,
      infoShow: true,
      newEvent: false,
      removed: marker.title,
      featured: null,
      removedId: marker.id
    })
  }

  handleMapClick = (mapProps, map, clickEvent) => {
    this.setState({
      infoLat: clickEvent.latLng.lat(),
      infoLng: clickEvent.latLng.lng(),
      infoShow: true,
      newEvent: true,
      removed: [],
      removedId: null
    })
  }

  mouseEnter(marker) {
    this.setState({featured: marker})
  }

  mouseLeave(marker) {
    this.setState({featured: null})
  }

  render() {
    return (
      <div className="container">
        <div className="navBar">
          <h2>Filter Event</h2>
          <input type="text" placeholder="search..."/>
          <DayPicker />
          {
            this.state.markers.map(e => (
              <Link to = { `/events/${e.id}` } style={{ textDecoration: "none", color: "#471ea0"}} key = { e.id }>
                <div
                  onMouseLeave = { () => this.mouseLeave(e) }
                  onMouseEnter = { () => this.mouseEnter(e) }>
                  <h3>{ e.title }</h3>
                  <hr/>
                </div>
              </Link>
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
                <div onClick={() => this.props.history.push(`/events/${this.state.removedId}`)}>
                  <img src = {`data:image/png;base64, ${this.state.image}`}/><span>{this.state.removed}</span>
                </div>
            }
          </InfoWindow>

          {
            !this.state.featured ?
            this.state.markers.filter(e => !this.state.removed.includes(e.title)).map(e => {
              return(
                  <Marker
                    key = { e.id }
                    title = { e.title }
                    name = { e.title }
                    position = {{lat: e.lat, lng: e.lng}}
                    onClick = { () => this.onMarkerClick(e) }
                    />
            )
          })
          :
          <Marker
            title = { this.state.featured.title }
            name = { this.state.featured.title }
            position = {{lat: this.state.featured.lat, lng: this.state.featured.lng}}
            />
          }
        </Map>
    </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey
})(App)
