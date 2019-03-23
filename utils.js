const md5 = require('md5')

const { secret } = require("./secret.json");

const hashPassword = password => md5(`${secret}${password}${secret}`)
const authMiddleware =(req, res, next) => {
  const token = req.get("authorization")
  jwt.verify(token, secret, (err, data) => {
    if (err) {
      res.status(403).json({ message: err.message })
    } else {
      next()
    }
  })
}

module.exports = {
  hashPassword,
  authMiddleware
}
