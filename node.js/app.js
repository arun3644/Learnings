// app.js
const { logEvents } = require('./logEvents');

// Test the logEvents function by logging some events
logEvents('Application started', 'INFO').then(() => {
    console.log('First log written successfully');
});

logEvents('An error occurred while processing request', 'ERROR').then(() => {
    console.log('Error log written successfully');
});
