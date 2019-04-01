const md5 = require('md5')
const jwt = require("jsonwebtoken")

const { secret } = require("./secret.json");

const hashPassword = password => md5(`${secret}${password}${secret}`)
const authMiddleware =(req, res, next) => {
  const token = req.get("authorization").split(" ")[1]
  jwt.verify(token, secret, (err, data) => {
    if (err) {
      res.status(403).json({ message: err.message })
    } else {
      const query_string = new Buffer(token.split(".")[1], 'base64').toString();
      req.token = JSON.parse(query_string);
      next()
    }
  })
}

module.exports = {
  hashPassword,
  authMiddleware
}
