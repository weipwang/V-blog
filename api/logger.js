var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('hello world')
})

module.exports = {
  path: '/api',
  handler: app
}
