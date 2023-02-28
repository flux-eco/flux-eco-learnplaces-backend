/**
 * Represents the configuration for the flux-eco-learnplaces-backend.
 */
class FluxEcoConfig {
    /**
     * Creates an instance of Config.
     * @param {Object} configObj - The configuration object loaded from a JSON file.
     * @param {Object<string, Function>} actionCallables - An object mapping action names to their corresponding callable functions.
     **/
    constructor(configObj, actionCallables) {
        this.server = configObj.endpoints.http.server;
        this.static = configObj.endpoints.http.static;
        this.iliasDatabase = configObj.bindings.iliasDatabase;
        this.boundActions = configObj.bindings.boundActions;
        this.actions = configObj.endpoints.http.actions.map((action) => {
            const actionCallable = actionCallables[action.actionCallable];
            return {
                actionPath: action.actionPath,
                method: action.method,
                responseFile: action.responseFile,
                headers: action.headers || {},
                actionCallable
            };
        });
    }

    /**
     * Gets the server configuration.
     * @returns {Object} The server configuration.
     */
    getServerConfig() {
        return this.server;
    }

    /**
     * Gets the static endpoint configuration.
     * @returns {Object} The static endpoint configuration.
     */
    getStaticConfig() {
        return this.static;
    }

    /**
     * Gets the ilias database server configuration.
     * @returns {Object} The ilias database asrver configuration.
     */
    getIliasDatabaseConfig() {
        return this.iliasDatabase;
    }

    /**
     * Gets the bound actions configuration.
     * @returns {Object[]} The bound actions configuration.
     */
    getBoundActionsConfig() {
        return this.boundActions;
    }

    /**
     * Gets the actions' configuration.
     * @returns {Object[]} The actions configuration.
     */
    getActionsConfig() {
        return this.actions;
    }
}
