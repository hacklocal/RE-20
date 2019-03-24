import React, { Component } from "react"
import { signup } from "../helpers/api.js"
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      password: "",
      name: "",
      phone: "",
      bio: "",
      address: "",
      image: {}
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
    signup({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      phone: this.state.phone,
      bio: this.state.bio,
      image: this.state.image.base64,
      address: this.state.address
    })
    .then(console.log)
    .catch(console.log)
    /*createEvent({
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
    }).then(console.log)*/
  }

  handleTextboxUpdate({ target: { id, value } }) {
    const state = {}
    state[id] = value
    this.setState(state)
  }

  render() {
    console.log(this.state)
    return (
        <div id = { "register" }>
          <h1>Registrati</h1>
            {
              this.state.image.base64 ?
              <img id = { "profile-pic" } src = { this.state.image.base64 } />
              :
              <div id = { "profile-pic" }></div>
            }
            <div id = { "form" }>
              <form>
                <fieldset>
                  <legend>
                    <span className="number">1</span> Immagine:
                  </legend>
                  <input type = { "file" } id = { "input-pic" } onChange = { this.handleUpload.bind(this) }/>
                </fieldset>
                <fieldset>
                <legend>
                  <span className = { "number" }>2</span> Username:
                </legend>
                <input id = { "username" } value = { this.state.username } onChange = { this.handleTextboxUpdate.bind(this) } type = { "text" } placeholder = { "Inserisci l'username" }/>
              </fieldset>
              <fieldset>
                <legend>
                  <span className = { "number" }>3</span> E-mail:
                </legend>
                <input id = { "email" } value = { this.state.email } onChange = { this.handleTextboxUpdate.bind(this) } type = { "email" } placeholder = { "Inserisci l'email" }/>
              </fieldset>
              <fieldset>
                <legend>
                  <span className = { "number" }>4</span> Password:
                </legend>
                <input id = { "password" } value = { this.state.password } onChange = { this.handleTextboxUpdate.bind(this) } type = { "password" } placeholder = { "Inserisci la password" }/>
              </fieldset>
              <fieldset>
                <legend>
                  <span className = { "number" }>5</span> Nome e cognome:
                </legend>
                <input id = { "name" } value = { this.state.name } onChange = { this.handleTextboxUpdate.bind(this) } type = { "text" } placeholder = { "Inserisci nome e cognome" }/>
              </fieldset>
              <fieldset>
                <legend>
                  <span className = { "number" }>6</span> Indirizzo:
                </legend>
                <input id = { "address" } value = { this.state.address } onChange = { this.handleTextboxUpdate.bind(this) } type = { "text" } placeholder = { "Inserisci la tua via" }/>
              </fieldset>
              <fieldset>
                <legend>
                  <span className = { "number" }>7</span> Numero di telefono:
                </legend>
                <input id = { "phone" } value = { this.state.phone } onChange = { this.handleTextboxUpdate.bind(this) } type = { "text" } placeholder = { "Inserisci il numero di telefono" }/>
              </fieldset>
              <fieldset>
                <legend>
                  <span className = { "number" }>8</span> Bio:
                </legend>
                <textarea id = { "bio" } onChange = { this.handleTextboxUpdate.bind(this) } value = { this.state.bio } placeholder = { "Inserisci una tua breve biografia" }/>
              </fieldset>
              <input type="submit"  onClick = { this.handleSubmit.bind(this) } value="Registrati ora!"/>
              <div>
                <GoogleLoginButton style={{width: "47%", float: "left"}}/>
                <FacebookLoginButton style={{width: "47%", float: "right"}}/>
              </div>
            </form>
          </div>
      </div>
    )
  }
}

export default Signup
