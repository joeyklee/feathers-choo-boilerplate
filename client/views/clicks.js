var html = require('choo/html')

var TITLE = 'client - clicks'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
      <main class="pa3 cf center">


        <section class="fl mw6 w-50-m w-third-l pa3">
          <h2>4.</h2>

          <p>Number of clicks stored: ${state.totalClicks}</p>

          <button class="dim ph3 ba bw1 pv2 b--black pointer bg-white"
            onclick=${handleClick}>
            Emit a click event
          </button>

          <br><br>
        </section>

      </main>
    </body>
  `

  function handleClick () {
    emit('clicks:add', 1)
  }
}
