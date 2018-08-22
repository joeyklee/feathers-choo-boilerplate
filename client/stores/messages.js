module.exports = store

const client = require('@feathersjs/client');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
// Set up a socket connection to our remote API
const socket = io('http://127.0.0.1:3030');
const api = client().configure(socketio(socket));

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
}
