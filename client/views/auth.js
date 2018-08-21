var html = require('choo/html')
var Auth = require("../components/Auth")
var TITLE = 'client - authentication'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
      <main class="pa3 cf center">
        ${this.state.cache(Auth, "Auth").render()}
      </main>
    </body>
  `

}
