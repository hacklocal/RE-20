//TODO schema validator

const port = 8000
const express = require("express")
const app = express()
const apiRouter = require("./routers/api.js")
const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')

  next()

})

app.options("*", () => {
  res.send(200)
})

app.use((req, res, next) => {
  res.error = (error, statusCode = 500) => {
    res.status(statusCode).json({
      error
    })
  }
  next()
})

app.get("/", (req, res) => {
  res.send("This is the home page")
})

app.use("/api", apiRouter)

app.all("*", (req, res) => {
  res.status(404).send("page not found")
})

app.listen(port, () => console.log(`server listening on port ${port}`))
