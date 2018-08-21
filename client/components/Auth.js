var html = require('choo/html')
var component = require('choo/component');

class Auth extends component {
  constructor(name, state, emit){
    super(name)

    this.state = state;
    this.emit = emit;

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  update(){
    return true
  }

  handleChange(e){
    // e.preventDefault();
    console.log("value changing!")
  }

  onSubmit(e){
    e.preventDefault();
    var form = e.currentTarget
    var formData = new FormData(form)
    console.log(formData.get("email"))
    console.log(formData.get("password"))
    console.log("login clicked!")
    console.log(e.target)
    if(e.target.id == "login"){
      this.emit("auth:login", formData)
    }
    if(e.target.id == "signup") {
      this.emit("auth:signup", formData)
    }
  }

  createElement(){
    return html`
      <div>
        <h2>Log in!</h2>
        <form id="login" onsubmit=${this.onSubmit}>
        <input name="email" value="test@test.com" type="email" onkeyup=${this.handleChange} placeholder="test@test.com"/> <br><br>
        <input name="password" value="test" type="password" onkeyup=${this.handleChange} placeholder="test"/> <br><br>
        <input type="submit" value="Login!">
        </form>

        <br><br>
        <h2>signup</h2>
        <form id="signup" onsubmit=${this.onSubmit}>
        <input name="email" value="test@test.com" type="email" onkeyup=${this.handleChange} placeholder="test@test.com"/> <br><br>
        <input name="password" value="test" type="password" onkeyup=${this.handleChange} placeholder="test"/> <br><br>
        <input type="submit" value="Signup!">
        </form>
      </div>
    `
  }

}

module.exports = Auth
