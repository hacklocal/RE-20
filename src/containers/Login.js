import React, { Component } from "react"
import { login } from "../helpers/api.js"
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      buttonText: "Login"
    }
  }

  handleTextboxUpdate({ target: { type, value } }) {
    const state = {}
    state[type] = value
    this.setState(state)
  }

  handleSubmit(e) {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search);

    login(this.state.email, this.state.password)
      .then(({ token }) => {
        if (token) {
          sessionStorage.setItem("token", token)
          if(urlParams.get("lat") && urlParams.get("lng")) {
            this.props.history.push(`/new-event?lat=${urlParams.get("lat")}&lng=${urlParams.get("lng")}`)
          } else {
            this.props.history.push("/")
          }
        } else {
          this.setState({
            buttonText: "Username o password errate. Ritenta."
          })
        }
      })
  }

  render() {
    console.log(this.state)
    return(
      <div id = { "login" }>
        <form>
          <h1>Login</h1>
          {
            ["email", "password"].map((field, legend) => (
              <fieldset>
                <legend>
                  <span className = { "number" }>{ legend + 1 }</span> {field}:
                </legend>
                <input type = { field } onChange = { this.handleTextboxUpdate.bind(this) } placeholder = { `Inserisci la tua ${field}` }/>
              </fieldset>
            ))
          }
          <input type = { "submit" } onClick = { this.handleSubmit.bind(this) } value = { this.state.buttonText } />
          <input type = { "button" } onClick = { () => this.props.history.push("/signup") } value = { "Sign-Up" } />
          <fieldset>
          <div>
            <GoogleLoginButton style={{width: "47%", float: "left"}}/>
            <FacebookLoginButton style={{width: "47%", float: "right"}}/>
          </div>
        </fieldset>
        </form>
      </div>
    )
  }
}

export default Login
