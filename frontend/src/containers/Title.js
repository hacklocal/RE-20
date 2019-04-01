import React from 'react'
import logo from "../assets/logo.png"
import { Link } from "react-router-dom"

const Title = () => (
  <Link to="/"><img id = { "logo" } src = { logo }/></Link>
)

export default Title
