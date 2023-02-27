/**
 * @typedef RestApiBindingConfig
 * @property {string} baseUrl - Base URL of the REST API.
 * @property {Object.<string, RestApiBindingConfigAction>} actions - List of REST API actions.
 */

/**
 * @typedef RestApiBindingConfigAction
 * @property {string} method - HTTP method of the action.
 * @property {string} path - Path of the action URL.
 * @property {function} handler - Handler function for the action.
 */

/**
 * A REST API client.
 */
export class RestApiClient {
    /**
     * @var {RestApiBindingConfig}
     */
    #config;

    /**
     * Create a new REST API client.
     * @param {RestApiBindingConfig} restApiBindingConfig - The REST API binding configuration.
     */
    constructor(restApiBindingConfig) {
        this.config = restApiBindingConfig;
    }

    /**
     * Sends an HTTP request to the REST API.
     * @param {string} actionName - the action to invoke on the REST API
     * @param {object} [params] - optional parameters for the action
     * @returns {Promise} - the promise that will be resolved with the response data, or rejected with an error
     */
    async sendRequest(actionName, params = {}) {
        const config = this.#config;
        const actionConfig = config.actions[actionName];
        const url = this.#getUrl(config.baseUrl, actionConfig.path, params)

        const response = await fetch(
            url.toString(),
            {
            method:  actionConfig.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa(`${config.username}:${config.password}`)}`
            },
            body: actionConfig.method === 'GET' ? undefined : JSON.stringify(params)
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return await response.json();
    }


    /**
     * Get the URL for a REST API action with the given path and parameters.
     * @param {string} baseUrl - The baseUrl of the REST API.
     * @param {string} actionPath - The path of the REST API action.
     * @param {Object.<string, string>} [params] - URL parameters for the action.
     * @returns {string} The URL for the REST API action.
     * @private
     */
    #getUrl(baseUrl, actionPath, params = {}) {
        const url = new URL(actionPath, baseUrl);
        for (const [key, value] of Object.entries(params)) {
            url.searchParams.append(key, value);
        }
        return url;
    }
}
