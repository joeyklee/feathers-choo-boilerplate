# Choo.js meets Feathers.js

This is a little example of putting choo.js and feathers.js together in one playground.

I hope it can serve as a boilerplate for dealing with Auth and more. I love Choo.js and Feathers.js seems too good to be true sometimes. I will try to add in different branches to show incremental development before it gets too big to read anymore.

## Branches

### 00-generate-choo-and-feathers
### 01-feathers-auth-with-message-service-and-hooks

##
```
cd server
feathers generate authentication
```
? What authentication providers do you want to use? Other PassportJS strategies
not in this list can still be configured manually. Username + Password (Local)
? What is the name of the user (entity) service? users
? What kind of service is it? NeDB
? What is the database connection string? nedb://../data

```
feathers generate service
```
? What kind of service is it? NeDB
? What is the name of the service? messages
? Which path should the service be registered on? /messages
? Does the service require authentication? Yes

```
feathers generate hooks
```
? What is the name of the hook? process-message
? What kind of hook should it be? before
? What service(s) should this hook be for (select none to add it yourself)?
 messages
? What methods should the hook be for (select none to add it yourself)? create

```
```
const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

```
```


```
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

    // best practice: always return the context;
    return context;
  };
};
```

```
feathers generate hook
```
? What is the name of the hook? populate-user
? What kind of hook should it be? after
? What service(s) should this hook be for (select none to add it yourself)?
 messages
? What methods should the hook be for (select none to add it yourself)? all

```
feathers generate hook
```
? What is the name of the hook? gravatar
? What kind of hook should it be? before
? What service(s) should this hook be for (select none to add it yourself)?
 users
? What methods should the hook be for (select none to add it yourself)? create


**
## Setup

In terminal window 1:
```
cd client
npm install
npm start
```

In terminal window 2:
```
cd server
npm install
npm start
```
