var html = require('choo/html')
var component = require('choo/component');


class Messages extends component {
  constructor(name, state, emit){
    super(name)

    this.state = state;
    this.emit = emit;

    this.submitMessage = this.submitMessage.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  update(){
    return true
  }

  handleChange(e){
    // e.preventDefault();
    let val = e.target.value
    console.log(val)
  }

  submitMessage(e){
    e.preventDefault();
    let form = e.currentTarget;
    let formData = new FormData(form);
    this.emit("messages:create", formData)
    this.emit("messages:getMessages")
    // Call the `messages` service
    console.log("button clicked!")
  }

  removeMessage(e){
    console.log(e.target.dataset.id)
    let messageId = e.target.dataset.id
    this.emit("messages:remove", messageId)
    this.emit("messages:getMessages")
  }


  createElement(){

    return html`
      <div>
        ${this.state.messages.map( (message) => html`<p data-id=${message._id} onclick=${this.removeMessage}>${message.text}</p>`)}
        <form onsubmit=${this.submitMessage}>
          <input type="text" name="message">
          <input type="submit" value="Submit Message!">
        </form>
      </div>
    `
  }

}

/**
 * <input name="message" value="" type="text" onkeyup=${this.handleChange}/>
 <button onclick=${this.submitMessage}>hello!</button>
 */

module.exports = Messages
