/**
 * @typedef {Object} FluxEcoHttpEndpointAction
 * @property {string} path - The endpoint path.
 * @property {string} apiActionId - The ID of the API action that this endpoint maps to.
 * @property {Object<string,*>} [params] - Additional parameters that can be passed to the API action.
 */

/**
 * @typedef {Object} FluxEcoHttpEndpoint
 * @property {string} serverConfigId - The ID of the server configuration for the HTTP endpoint.
 * @property {string} policyConfigId - The ID of the policy configuration for the HTTP endpoint.
 * @property {Object<string, FluxEcoHttpEndpointAction>} actions - The API actions associated with this endpoint.
 */

/**
 * @typedef {Object} FluxEcoBindingActionParams
 * @property {string} [sql] - The SQL query for a MySQL-bound action.
 * @property {Object<string,*>} [restApiParams] - Additional parameters that can be passed to a REST API-bound action.
 */

/**
 * @typedef {Object} FluxEcoBindingAction
 * @property {string} handlerType - The type of the action handler.
 * @property {FluxEcoBindingActionParams} params - The parameters for the action.
 */

/**
 * @typedef {Object} FluxEcoBinding
 * @property {string} serverConfigId - The ID of the server configuration for the bound server.
 * @property {Object<string, FluxEcoBindingAction>} actions - The bound actions associated with the server.
 */

/**
 * @typedef {Object} FluxEcoAppConfig
 * @property {Object<string, FluxEcoHttpEndpoint>} [endpoints] - The HTTP endpoints for the application.
 * @property {Object<string, FluxEcoBinding>} [bindings] - The bound servers and actions for the application.
 */

/**
 * @typedef {Object} FluxEcoEventSubscriber
 * @property {string} subscriberId - The ID of the subscriber.
 * @property {function} callback - The function to be called when the event is fired.
 */

/**
 * @typedef {Object} FluxEcoEvent
 * @property {string} name - The name of the event.
 * @property {Array<string>} [allowedSubscribers] - An optional list of allowed subscriber IDs.
 * @property {Array<string>} [requiredSubscribers] - An optional list of required subscriber IDs.
 * @property {Array<FluxEcoEventSubscriber>} subscribers - The subscribers for the event.
 */

/**
 * The configuration for the REST API binding.
 * @typedef {Object} HttpServerConfig
 * @property {string} protocol - The protocol to use (http or https).
 * @property {string} host - The host name or IP address to bind the server to.
 * @property {number} port - The port number to listen on.
 * @property {string} basePath - The base URL for the binding.
 * @property {string} user - User to authenticate as
 * @property {string} password - Password for the user
 */


/**
 * @typedef {Object}  DatabaseServerConfig
 * @property {string} host - Hostname or IP address of the database server
 * @property {number} port - Port number to use. Defaults to 3306
 * @property {string} database - Name of the database to use
 * @property {string} user - User to authenticate as
 * @property {string} password - Password for the user
 */

/**
 * Policy configuration object that specifies the allowed IP addresses and required headers for accessing the server.
 *
 * @typedef {Object} HttpPolicyConfig
 * @property {string[]} allowedIps - An array of allowed IP addresses as strings.
 * @property {string[]} requiredHeaders - An array of required headers as strings.
 * @property {Object<string, string>} headerNames - An object containing header name mappings, where the keys are the internal names and the values are the header names used in the request.
 */


/**
 * The configuration for an action in an action binding.
 * @typedef {Object} ActionConfig
 * @property {null|Object.<string, string>} actionParameterNames - A optional mapping of action parameter names - where the keys are the internal names and the values are the parameter names used in the action.
 * @property {null|Object.<string, string>} actionParameterSchema - A optional mapping of action parameter schemas - where the keys are the internal names and the values are the parameter schemas for validating
 * @property {string} actionHandlerName - the name of the instance of the action handler
 * @property {MysqlActionConfigOptions|RestApiActionBindingConfigOptions} bindingOptions
 */


/**
 * The mysql action options for an action in an action binding.
 * @typedef {Object} MysqlActionConfigOptions
 * @property  {string} sql - The SQL statement to execute.
 */

/**
 * The configuration for an action in an action binding.
 * @typedef {Object} RestApiActionBindingConfigOptions
 * @property {string} method - The HTTP method for the action (GET, POST, etc.).
 * @property {Object} headers - The headers to send with the request.
 * @property {string} path - The dynamic route
 *
 * @example
 * const actionConfig = RestApiActionBindingConfigOptions.new({
 *   method: 'GET',
 *   headers: { 'Content-Type': 'application/json' },
 *   path: /users/:id,
 * });
 */