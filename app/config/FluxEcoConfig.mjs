/**
 * @typedef {Object} HttpServerConfig
 * @property {Object} server - Konfiguration für den HTTP-Server
 * @property {string} server.port - Der Port, auf dem der Server hören soll
 * @property {string} server.host - Die IP-Adresse oder Hostname, auf dem der Server ausgeführt werden soll
 * @property {Object.<string, {policy: {path: string, requiredHeaders: string, allowedHeaders: string, allowedIps: string}}>} policies - Konfiguration der Zugriffspolitik
 * @property {Object.<string, {path: string}>} staticFiles - Konfiguration der statischen Dateien
 * @property {Object.<string, {action: {name: string, path: string, method: "GET"|"POST"|"PUT"|"DELETE"}}>} actions - Konfiguration der Aktionen
 */

/**
 * Represents the configuration for the flux-eco-learnplaces-backend.
 */
export class FluxEcoConfig {
    #endpoints

    /**
     * Creates an instance of Config.
     * @param {Object} configObj - The configuration object loaded from a JSON file.
     * @param {Object<string, Function>} actionCallables - An object mapping action names to their corresponding callable functions.
     **/
    constructor(configObj, actionCallables) {
        this.#endpoints = configObj.endpoints;
        this.bindings =  configObj.bindings;
    }

    static async new(configObj) {
        return new FluxEcoConfig(configObj)
    }

    /**
     * Gets the server configuration.
     * @returns {HttpServerConfig} The server configuration.
     */
    get httpEndpoints() {
        return this.#endpoints.http;
    }
}
