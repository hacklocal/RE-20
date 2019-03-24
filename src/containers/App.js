import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { Link } from "react-router-dom"
import { apiKey } from "../const"
import { styles } from "../styleMap"
import { InfoWindowEx as InfoWindow } from "./InfoWindowEx"
import DayPicker from 'react-day-picker'

import 'react-day-picker/lib/style.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: [],
      images: [],
      infoLat: 44.708408,
      infoLng: 10.623389,
      newEvent: false,
      removed: [],
      image: null,
      removedId: null,
      removedByData: [],
      filter: ""
    }
    this.handleMapClick = this.handleMapClick.bind(this)
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
    this.search = this.search.bind(this)
    this.changeDate = this.changeDate.bind(this)
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
          id: e.id,
          categoryName: e.categoryName,
          colour: e.colour
        }))
        this.setState({
          markers
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
      removedId: marker.id,
      image: null
    })

    fetch(`http://192.168.43.212:8000/api/events/${marker.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          image: data.image
        })
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
    this.setState({
      featured: marker,
      infoShow: false
    })
  }

  mouseLeave(marker) {
    this.setState({featured: null})
  }

  search(event) {
    // console.log(this.state.markers.filter(({ title }) => !title.toLowerCase().startsWith(event.target.value.toLowerCase())))
    this.setState({
      removed: this.state.markers.filter(({ title }) => !title.toLowerCase().startsWith(event.target.value.toLowerCase())).map(e => e.title),
      removedId: null,
      filter: event.target.value.toLowerCase(),
      infoShow: false
    })
  }

  changeDate(day) {
    this.setState((prevState) => {
      return {
        removedByData: this.state.markers.filter(e => ! (new Date(e.start).getDay() === new Date(day).getDay() && new Date(e.start).getMonth() === new Date(day).getMonth())).map(e => e.title)
      }
    })
  }

  render() {
    return (
      <div className="container">
        <div className="navBar">
          <h2>FILTRA GLI EVENTI:</h2>
          <div id = { "search" }><input type = "text" placeholder = "Cerca..." onChange = { this.search }/></div>
          <DayPicker onDayClick = { this.changeDate }/>
          {
            this.state.markers.filter(({ title }) => title.toLowerCase().startsWith(this.state.filter)).map(e => (
              <Link to = { `/events/${e.id}` } style={{ textDecoration: "none", color: "#471ea0"}} key = { e.id }>
                <div
                  className = { "events-list" }
                  onMouseLeave = { () => this.mouseLeave(e) }
                  onMouseEnter = { () => this.mouseEnter(e) }>
                  <h3>{ e.title }</h3>
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
            maxWidth = { 250 }
            visible = { this.state.infoShow }
            onClose = { () => {
              this.setState({
                removed: [],
                infoShow: false,
                image: null
               })
            } }
            >
            {
              this.state.newEvent ?
                <input type="button" id="addButton" value="Nuovo Evento" onClick={() => {
                    if(window.sessionStorage.getItem("token")) {
                      this.props.history.push(`/new-event?lat=${this.state.infoLat}&lng=${this.state.infoLng}`)
                    } else {
                      this.props.history.push(`/login?lat=${this.state.infoLat}&lng=${this.state.infoLng}`)
                    }
                  }} />
                :
                <div onClick={() => this.props.history.push(`/events/${this.state.removedId}`)}>
                  <span><img src = { this.state.image } id = "thumbnail" align = "middle"/></span><span style={{lineBreak: "loose", fontWeight: "700"}}>{this.state.removed}</span>
                </div>
            }
          </InfoWindow>

          {
            !this.state.featured ?
            this.state.markers.filter(e => !(this.state.removed.includes(e.title) || this.state.removedByData.includes(e.title))).map(e => {
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
