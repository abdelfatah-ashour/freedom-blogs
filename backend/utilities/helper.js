const { loggerError } = require('./winston');

module.exports = () => {
    // handle uncaughtException Error
    process.on('uncaughtException', err => {
        loggerError.error(err.message);
        process.exit(1);
    });

    // handle unhandledRejection Error
    process.on('unhandledRejection', reason => {
        loggerError.error('There was an uncaught error ' + reason);
    });
};
