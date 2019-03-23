import React, { Component } from "react"
import { Map, GoogleApiWrapper } from 'google-maps-react'
import { WithContext as ReactTags } from 'react-tag-input'
import { apiKey } from "../const"

const KeyCodes = {
  enter: 13
}

const delimiters = [KeyCodes.enter]

class NewEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: [],
      image: {},
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
