var css = require('sheetify')
var choo = require('choo')

// var messages = require("./views/messages")

css('tachyons')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.use(require('./stores/clicks'))
app.use(require('./stores/messages'))

app.route('/', require('./views/main'))
app.route('/clicks', require('./views/clicks'))
app.route('/messages', require('./views/messages'))
app.route('/*', require('./views/404'))

module.exports = app.mount('body')
