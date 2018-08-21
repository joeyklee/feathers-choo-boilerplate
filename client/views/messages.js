var html = require('choo/html')
var Messages = require('../components/Messages.js')

var TITLE = 'client - messages'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
      <main class="pa3 cf center">
        ${this.state.cache(Messages, "Messages").render()}
      </main>
    </body>
  `

  function handleClick () {
    emit('clicks:add', 1)
  }
}
