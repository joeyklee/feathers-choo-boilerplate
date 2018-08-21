// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    // grab the data from the context
    const {data} = context;

    // if the data contains no text
    if(!data.text){
      throw new Error("a message must have text!")
    }

    // the auth'd user
    const user = context.params.user;

    // the message
    // messages can't be longer than 400 chars
    const text = context.data.text.substring(0,400)

    context.data = {
      text,
      userId: user._id
      createdAt: new Date().getTime()
    }
    
    return context;
  };
};
