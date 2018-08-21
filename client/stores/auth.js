module.exports = store

const client = require('@feathersjs/client');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const auth = require('@feathersjs/authentication-client');
// Set up a socket connection to our remote API
const socket = io('http://127.0.0.1:3030');
const api = client().configure(socketio(socket));
api.configure(auth({
  header: 'Authorization', // the default authorization header for REST
  prefix: '', // if set will add a prefix to the header value. for example if prefix was 'JWT' then the header would be 'Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOi...'
  path: '/authentication', // the server-side authentication service path
  jwtStrategy: 'jwt', // the name of the JWT authentication strategy
  entity: 'user', // the entity you are authenticating (ie. a users)
  service: 'users', // the service to look up the entity
  cookie: 'feathers-jwt', // the name of the cookie to parse the JWT from when cookies are enabled server side
  storageKey: 'feathers-jwt', // the key to store the accessToken in localstorage or AsyncStorage on React Native
  storage: localStorage // Passing a WebStorage-compatible object to enable automatic storage on the client.
}))
// Available options are listed in the "Options" section

// client.configure(api.authentication({
//   storage: window.localStorage
// }));

// curl -H "Content-Type: application/json" -H "Authorization: <your access token>" -X POST http://localhost:3030/authentication

function store (state, emitter) {

  emitter.on('DOMContentLoaded', function () {

    emitter.on("auth:login", function(formData){
      if(!formData){
        // try to auth using JWT from local Storage
        api.authenticate().then( () => {
            console.log("brilliant! you're auth'd!")
            emitter.emit("pushState", "messages")
        })
      } else{
        // If we get login information, add the strategy we want to use for login
        let credentials = {
          email: formData.get("email"),
          password: formData.get("password")
        }
        // create the payload
        const payload = Object.assign({ strategy: 'local' }, credentials);

        // call authenticate!
        api.authenticate(payload).then(() => {
        // Logged in
          console.log("logged in!")
          emitter.emit("pushState", "messages")
        }).catch(e => {
          // Show login page (potentially with `e.message`)
          console.error('Authentication error', e);
          emitter.emit("pushState", "auth")
        });
      }

    });

    emitter.on("auth:signup", function(formData){

        let credentials = {
          email: formData.get("email"),
          password: formData.get("password")
        }

        api.service('users').create(credentials).then( () => {
          console.log("sign up successful yo!")
          emitter.emit("auth:login", formData)
        }).catch( err => {
          console.log(err);
        })

    });

    emitter.on("auth:logout", function(formData){
      emitter.emit("pushState", "auth")

    });



  })
}
