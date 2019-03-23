import React, { Component } from "react"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }
  handleTextboxUpdate({ target: { type, value } }) {
    const state = {}
    state[type] = value
    this.setState(state)
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
          <input type = { "submit" } value = { "Login" }/>
        </form>
      </div>
    )
  }
}

export default Login