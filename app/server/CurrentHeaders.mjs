/**
 * Represents the headers of the request to the server.
 * @class
 */
export class CurrentHeaders {
    /**
     * @var {null|number}
     */
    #xFluxIliasRestApiUserId;

    /**
     * Creates a new CurrentHeaders object
     * @constructor
     * @param {null|number} xFluxIliasRestApiUserId -  The userId of the user making the request.
     */
    constructor(xFluxIliasRestApiUserId) {
        this.#xFluxIliasRestApiUserId = xFluxIliasRestApiUserId;
    }

    /**
     * Creates a new CurrentHeaders object
     * @static
     * @param  {null|number} xFluxIliasRestApiUserId - The userId of the user making the request.
     */
    static async new(xFluxIliasRestApiUserId) {
        return new CurrentHeaders(xFluxIliasRestApiUserId);
    }

    /**
     * @return {null|number}
     */
    get xFluxIliasRestApiUserId() {
        return this.#xFluxIliasRestApiUserId;
    }
}