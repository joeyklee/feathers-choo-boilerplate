var html = require('choo/html')

var TITLE = 'client - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
      <main class="pa3 cf center">
        <h1> Welcome to the Magic Tracks!</h1>
        <p> This is a community and webspace dedicated to building and curating learning materials for the creative and the curious. </p>
      </main>
    </body>
  `

}
