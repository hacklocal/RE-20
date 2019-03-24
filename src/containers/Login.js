import React, { Component } from "react"
import { login } from "../helpers/api.js"

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
    login(this.state.email, this.state.password)
      .then(({ token }) => {
        if (token) {
          sessionStorage.setItem("token", token)
          this.props.history.push("/home")
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
          <input type = { "submit" } onClick = { this.handleSubmit.bind(this) } value = { this.state.buttonText }/>
        </form>
      </div>
    )
  }
}

export default Login