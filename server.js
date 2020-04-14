const http = require('http');
const app = require('./app');

// Normalize a port into a number, string, or false.
const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || 5000);
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Event listener for HTTP server "error" event.
const errorHandler = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated priviledges.');
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(bind + 'is already in use. ');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Event listener for HTTP server "listening" event.
const onListening = () => {
    const address = server.address();
    const bind = typeof address === 'string' 
    ? 'pipe' + address 
    : 'port: ' + port;
    console.log('Listening on ' + bind)
}

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', errorHandler);
server.on('listening', onListening);