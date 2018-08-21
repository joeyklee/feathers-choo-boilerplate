module.exports = store

const client = require('@feathersjs/client');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
// Set up a socket connection to our remote API
const socket = io('http://127.0.0.1:3030');
const api = client().configure(socketio(socket));

const auth = require('@feathersjs/authentication-client');
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

function store (state, emitter) {
  state.newMessage = {};
  state.messages = [];

  // get the initial set of messages
  // update them down below
  api.service('messages')
   .find({ query: {$sort: { updatedAt: -1 } } })
   .then(result => {
     console.log(result)
     state.messages = result.data;
     emitter.emit(state.events.RENDER)
   })
   .catch(err =>{
     return err;
   });


     // emitter events from feather only work on
   // https://docs.feathersjs.com/api/client/rest.html
   api.service("messages").on("created", function(message){
      console.log("a new message was created!", message)
      // state.messages.push(message.data);
      // emitter.emit(state.events.RENDER)
    })

  emitter.on('DOMContentLoaded', function () {

    emitter.on('messages:hello', function (newMessage) {
      console.log("hello")
      emitter.emit(state.events.RENDER)
    });

    emitter.on('messages:getMessages',  function () {

        api.service('messages')
         .find({ query: {$sort: { updatedAt: -1 } } })
         .then(result => {
           console.log(result)
           state.messages = result.data;
           emitter.emit(state.events.RENDER)
         })
         .catch(err =>{
           return err;
         });
    });

    // protected routes :)
    api.authenticate().then( () => {
      emitter.on('messages:create', function (formData) {

        console.log(formData.get("message"))
        // use the api service to send the messages
        api.service("messages").create({
          text: formData.get("message")
        })
        emitter.emit(state.events.RENDER)
      });

      emitter.on('messages:remove', function (messageId) {
        // use the api service to send the messages
        api.service("messages").remove(messageId)
        emitter.emit(state.events.RENDER)
      });

    })


  })
}
