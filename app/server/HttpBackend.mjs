import "../docs/config.json";

import http from 'http';
import fs from 'fs';
import path from 'path';

/**
 * A backend server that handles HTTP requests.
 */
class HttpBackend {
    /**
     * @var {HttpServer}
     */
    #server;
    /**
     * @var {HttpPolicyConfig}
     */
    #policies;
    /**
     * @var {HttpServer}
     */
    #actions;


    /**
     * Creates a new HttpBackend instance.
     */
    constructor() {
        // Load API config from file
        const config = fs.readFileSync('config.json', 'utf8');

        this.#server = JSON.parse(config.endpoints.http.server.replace(/\${(.*?)}/g, (match, varName) => {
            return process.env[varName] || match;
        }));

        this.#policies = JSON.parse(config.endpoints.http.policies.replace(/\${(.*?)}/g, (match, varName) => {
            return process.env[varName] || match;
        }));

        this.#actions = JSON.parse(config.endpoints.http.actions)

        // Create HTTP httpBackend instance
        this.httpBackend = http.createServer(this.handleRequest.bind(this));
    }


    /**
     * Middleware function that logs incoming requests.
     *
     * @param {http.IncomingMessage} request - The incoming HTTP request.
     * @param {http.ServerResponse} response - The HTTP response object.
     * @param {function} next - The next middleware function in the chain.
     */
    logRequests(request, response, next) {
        console.log(`Received ${request.method} request for ${request.url}`);
        next();
    }

    /**
     * Middleware function that handles errors.
     *
     * @param {Error} error - The error object.
     * @param {http.IncomingMessage} request - The incoming HTTP request.
     * @param {http.ServerResponse} response - The HTTP response object.
     * @param {function} next - The next middleware function in the chain.
     */
    handleErrors(error, request, response, next) {
        console.error(error);
        this.sendResponse(response, 500, 'Internal httpBackend error');
    }

    /**
     * Middleware function that serves static files.
     *
     * @param {http.IncomingMessage} request - The incoming HTTP request.
     * @param {http.ServerResponse} response - The HTTP response object.
     * @param {function} next - The next middleware function in the chain.
     */
    serveStaticFiles(request, response, next) {
        const filePath = path.join(__dirname, 'public', request.url);
        fs.readFile(filePath, (error, content) => {
            if (error) {
                next();
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(content, 'utf-8');
            }
        });
    }
    /**
     * Starts the HTTP server.
     */
    start() {
        // create HttpBackend instance
        const httpBackend = http.createServer();

        // add middlewares
        httpBackend.use(this.logRequests.bind(this));
        httpBackend.use(this.handleErrors.bind(this));
        httpBackend.use(this.serveStaticFiles.bind(this));

        // add request handler
        httpBackend.on('request', this.handleRequest.bind(this));

        // start server
        httpBackend.listen(this.#server.port, this.#server.host, () => {
            console.log(`HTTP server started on http://${this.#server.host}:${this.#server.port}`);
        });
    }

    /**
     * Handles messaging requests.
     *
     * @param {http.IncomingMessage} request - The incoming HTTP request.
     * @param {http.ServerResponse} response - The HTTP response object.
     */
    handleMessaging(request, response) {
        // Handle messaging requests here
        // ...
    }


    /**
     * Sends an HTTP response.
     *
     * @param {http.ServerResponse} response - The HTTP response object.
     * @param {number} status - The HTTP status code.
     * @param {string} message - The response message.
     */
    sendResponse(response, status, message) {
        response.writeHead(status, {'Content-Type': 'text/plain'});
        response.end(message);
    }
}

// Example usage
const server = new HttpBackend();
server.start();