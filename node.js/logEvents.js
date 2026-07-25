// logEvents.js
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const path = require('path');
const fsPromises = require('fs').promises;

// Function to log events
const logEvents = async (message, level = 'INFO') => {
    // Format the current date and time
    const dateTime = format(new Date(), 'ddMMyyyy\tHH:mm:ss');
    
    // Generate a unique identifier for the log event
    const logUuid = uuid();
    
    // Format the log event
    const logEvent = `${dateTime}\t${logUuid}\t[${level}]\t${message}\n`;

    try {
        // Define the log directory path
        const logDir = path.join(__dirname, 'logs');
        
        // Check if the 'logs' directory exists
        try {
            await fsPromises.access(logDir);  // Try to access the directory
        } catch (error) {
            // If directory doesn't exist, create it
            console.log('Logs directory does not exist. Creating it...');
            await fsPromises.mkdir(logDir);  // Create the directory
        }

        // Append the log event to the log file
        await fsPromises.appendFile(path.join(logDir, 'log.txt'), logEvent);
        console.log('Log written successfully.');
    } catch (error) {
        console.error('Error writing log:', error);
    }
};

module.exports = { logEvents };
