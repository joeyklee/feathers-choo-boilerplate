
const { authenticate } = require('@feathersjs/authentication').hooks;
const processMessage = require('../../hooks/process-message');

const populateUser = require('../../hooks/populate-user');

// allow people to get and find w/out auth
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'),processMessage()],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [populateUser()],
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
