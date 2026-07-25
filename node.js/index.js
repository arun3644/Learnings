// index.js

const { logEvents } = require('./logEvents');
console.log(typeof logEvents); // Should output 'function'

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Register an event listener for the 'log' event
myEmitter.on('log', (msg) => {
  logEvents(msg);
});

// Emit the 'log' event with a message
myEmitter.emit('log', 'log emitted successfully');
