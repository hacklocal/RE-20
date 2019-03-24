import React, { Component } from "react"
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { WithContext as ReactTags } from 'react-tag-input'
import { apiKey } from "../const"
import { styles } from "../styleMap"
import { createEvent } from "../helpers/api.js"
const KeyCodes = {
  enter: 13
}

const delimiters = [KeyCodes.enter]

class NewEvent extends Component {
  constructor(props) {
    super(props)
    const urlParams = new URLSearchParams(window.location.search);
    this.state = {
      name: "",
      description: "",
      tags: [],
      image: {},
      category: "Sport",
      lat: urlParams.get("lat"),
      lng: urlParams.get("lng"),
      startDate: null,
      endTime: null
    }
  }

  handleUpload(e) {
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

  handleSubmit(e) {
    e.preventDefault()
    createEvent({
      name: this.state.name,
      description: this.state.description,
      latitude: this.state.lat,
      longitude: this.state.lng,
      requiredAssets: this.state.tags.length,
      assets: this.state.tags.map(({ id }) => id),
      startTime: +new Date(this.state.startTime),
      endTime: +new Date(this.state.endTime),
      category: this.state.category,
      image: this.state.image.base64
    }, sessionStorage.getItem("token")).then(data => {
      console.log(data)
      this.props.history.push("/")
    })
    .catch()
  }

  handleTextboxUpdate({ target: { id, value } }) {
    const state = {}
    state[id] = value
    this.setState(state)
  }

  handleSelection(event) {
    const index = event.nativeEvent.target.selectedIndex
    this.setState({
      category: event.nativeEvent.target[index].text
    })
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
    return (
      <div id = { "new-event" }>
        <form>
          <div id = { "form" }>
            <form>
              <fieldset>
                <legend>
                  <span className = { "number" }>1</span> Informazioni:
                </legend>
                <input id = { "name" } value = { this.state.name } onChange = { this.handleTextboxUpdate.bind(this) } type = { "text" } placeholder = { "Nome" }/>
                <textarea id = { "description" } onChange = { this.handleTextboxUpdate.bind(this) } value = { this.state.description } placeholder = { "Descrizione" }/>
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
                  <span className = { "number" }>3</span> Categoria:
                </legend>
                <select onChange = { this.handleSelection.bind(this) }>
                  <option>Sport</option>
                  <option>Social</option>
                  <option>Arte e Cultura</option>
                  <option>Manifestazioni</option>
                  <option>Innovazione</option>
                  <option>Altro</option>
                </select>
              </fieldset>
              <fieldset>
                <legend>
                  <span className="number">4</span> Immagine:
                </legend>
                <input type = { "file" } onChange = { this.handleUpload.bind(this) }/>
                {
                  /*
                  this.state.image &&
                    <div id = { "thumb-container" }>
                      <img src = { this.state.image.base64 } id = { "thumb" }/>
                    </div>*/
                }
              </fieldset>
              <fieldset>
                <legend>
                  <span className="number">5</span> Data e ora di inizio:
                </legend>
                <input type="datetime-local" onChange = { event => this.setState({ startTime: event.target.value }) }/>
              </fieldset>
              <fieldset>
                <legend>
                  <span className="number">6</span> Data e ora di fine:
                </legend>
                <input type="datetime-local" onChange = { event => this.setState({ endTime: event.target.value }) }/>
              </fieldset>
              <input type="submit" id="submitButton" onClick = { this.handleSubmit.bind(this) } value="Submit"/>
            </form>
              <div id = { "map" }>
                <Map
                  google = { this.props.google }
                  style = {{
                    borderRadius: "50%",
                    border: "1px solid black"
                  }}
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
          </div>
        </form>
      </div>
    )
  }
}

export default GoogleApiWrapper({ apiKey })(NewEvent)
