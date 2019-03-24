import React, { Component } from "react"
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { WithContext as ReactTags } from 'react-tag-input'
import { apiKey } from "../const"
import { styles } from "../styleMap"
const KeyCodes = {
  enter: 13
}

const delimiters = [KeyCodes.enter]

class NewEvent extends Component {
  constructor(props) {
    super(props)
    const urlParams = new URLSearchParams(window.location.search);
    this.state = {
      tags: [],
      image: {},
      lat: urlParams.get("lat"),
      lng: urlParams.get("lng")
    }
  }

  componentDidMount() {

  }

  handleUpload(e) {
    console.log("ciao")
    const { name, type } = e.target.files[0]
    const reader = new window.FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = () => {
      this.setState({
        image: {
          name,
          type,
          base64: reader.result
        }
      })
    }
  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
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
                  <span className = { "number" }>2</span> Requisiti:
                </legend>
                <ReactTags tags={this.state.tags}
                   handleDelete={this.handleDelete.bind(this)}
                   handleAddition={this.handleAddition.bind(this)}
                   handleDrag={this.handleDrag.bind(this)}
                   delimiters={delimiters}
                   placeholder = { "Aggiungi un nuovo requisito" }
                   autofocus = { false }
                />
              </fieldset>
              <fieldset>
                <legend>
                  <span className="number">3</span> Immagine:
                </legend>
                <input type = { "file" } onChange = { this.handleUpload.bind(this) }/>
                {
                  this.state.image &&
                    <div id = { "thumb-container" }>
                      <img src = { this.state.image.base64 } id = { "thumb" }/>
                    </div>
                }
              </fieldset>
              <input type="submit" value="Submit"/>
              <div style={{textAlign: "center", justifyContent: "center"}}>
                <Map
                  google = { this.props.google }
                  style = {{ width: "400px", height: "400px", borderRadius: "50%" }}
                  zoom = { 16 }
                  minZoom = { 11 }
                  initialCenter = {{
                    lat: this.state.lat,
                    lng: this.state.lng
                  }}
                  styles={ styles }
                  disableDefaultUI = { true }
                >
                  <Marker position={{
                      lat: this.state.lat,
                      lng: this.state.lng
                  }}/>
                </Map>
            </div>
            </form>
          </div>
        </form>
      </div>
    )
  }
}

export default GoogleApiWrapper({ apiKey })(NewEvent)
