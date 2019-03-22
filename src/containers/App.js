import React, { Component } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
import { Link } from 'react-router-dom'
import { apiKey } from "../const"

class App extends Component {
  constructor() {
    super()
    this.state = {
      markers: []
    }
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
    const markers = []
    this.setState({ markers: this.fakeEvents })
  }

  render() {
    return (
      <Map google={this.props.google} className="mainMap"
        zoom={15}
        initialCenter={{
          lat: 44.697926,
          lng: 10.630456
        }}
        >
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
  apiKey
})(App)
