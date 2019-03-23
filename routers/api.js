const express = require("express")
const router = new express.Router()
const jwt = require("jsonwebtoken")
const mysql = require("mysql")
const config = require(`../db-config.json`)
const { hashPassword, authMiddleware } = require("../utils.js")

const { secret } = require("../secret.json");

const pool = mysql.createPool({
  connectionLimit: 10,
  ...config
})

module.exports = pool

router.get(`/events/:id?`, ({ params: { id } , body}, res) => {
  if (typeof id !== "undefined") {
    return pool.query(`SELECT * FROM Events WHERE id=${pool.escape(id)};`, (err, data) => {
      if (err) res.error(err)
      else res.json(data[0])
    })
  }

  //TODO startTime, endTime, name filters
  pool.query(`SELECT * FROM Events;`, (err, data) => {
    if (err) {
      res.error(err)
    } else {
      res.json(data)
    }
  })
})

router.get(`/users/:id?`, ({ params: { id } , body}, res) => {
  if (typeof id !== "undefined") {
    return pool.query(`SELECT id, email, username, name, phone, bio, image FROM Users WHERE id=${pool.escape(id)};`, (err, data) => {
      if (err) res.error(err)
      else res.json(data[0])
    })
  }

  //TODO email, username, name filters
  pool.query(`SELECT id, email, username, name, phone, bio, image FROM Users;`, (err, data) => {
    if (err) {
      res.error(err)
    } else {
      res.json(data)
    }
  })
})

router.post("/users", ({ body }, res) => {
  body.password = hashPassword(`${body.password}`)

  //todo verify base64 image and other fields
  pool.query(`SELECT email FROM Users WHERE email=${pool.escape(body.email)} or username=${pool.escape(body.username)}`, (err, results) => {
    if (err) {
      res.error(err)
    } else {
      if (!results.length) {
        pool.query(`INSERT INTO Users SET ?`, body, (err, results) => {
          if (err) {
            res.error(err)
          } else {
            res.status(201).json({ message: "user created" })
          }
        })
      } else {
        res.status(400).json({ message: "email or username already in-use" })
      }
    }
  })
})

router.post("/authentication", ({ body: { email, password } }, res) => {
  pool.query(`SELECT id FROM Users WHERE email=${pool.escape(email)} AND password="${hashPassword(password)}"`, (err, results) => {
    if (err) {
      return res.error(err)
    }

    if (results.length === 1) {
      const token = jwt.sign({
        id: results[0].id
      }, secret, { algorithm: "HS512" })

      res.json({token})
    } else {
      res.status(401).json({ message: "wrong email or password"})
    }
  })
})

//todo autorization, set event creator
router.post("/events", ({ body }, res) => {
  console.log(body)
  body.creatorId = 1 //todo remove, set real creator
  //todo verify body fields (schema validator)
  pool.query(`INSERT INTO Events SET ?`, body, (err, results) => {
    if (err) {
      res.error(err)
    } else {
      res.status(201).json({ message: "event created" })
    }
  })
})

//todo auth, check event creator
router.delete("/events/:id", ({ params: { id }, headers }, res) => {
  console.log(headers)
  //todo verify body fields (schema validator)                (check event creator)
  pool.query(`DELETE FROM Events WHERE id = ${pool.escape(id)}`, (err, results) => {
    if (err) {
      res.error(err)
    } else {
      if (results.affectedRows)
        res.status(201).json({ message: "event deleted" })
      else
        res.error(`No event with id ${id}`)
    }
  })
})

//TODO THESE need to be finished (jwt middleware)
//todo auth
router.post("/events/:id/users", ({ params: { id } }, res) => {
  //todo verify body fields (schema validator)
  pool.query(`INSERT INTO Users_Event_th VALUES(DEFAULT, ${1/*todo add user id*/}, ${id}`, (err, results) => {
    if (err) {
      res.error(err)
    } else {
      res.status(201).json({ message: "event created" })
    }
  })
})

module.exports = router

