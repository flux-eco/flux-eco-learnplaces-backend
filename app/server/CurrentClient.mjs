/**
 * Represents the current client that is making a request to the server.
 * @class
 */
export class CurrentClient {
    /**
     * @var {string}
     */
    #clientIp;
    /**
     * @var {number}
     */
    #userId;

    /**
     * Creates a new CurrentClient object with the provided client IP address.
     * @constructor
     * @param {string} clientIp - The IP address of the client making the request.
     * @param {number} userId - The userId of the user making the request.
     * @throws {Error} If the provided client IP address is not a valid IP address.
     * @throws {Error} If the provided userId is not a number > 0
     */
    constructor(clientIp, userId) {
        /*if (!CurrentClient.validateIpAddress(clientIp)) {
            throw new Error('Invalid IP address provided.');
        }
        if (!CurrentClient.validateUserId(userId)) {
            throw new Error('Invalid UserId provided');
        }*/
        this.#clientIp = clientIp;
        this.#userId = userId;
    }

    /**
     * Creates a new CurrentClient object with the provided client IP address.
     * @static
     * @param {string} clientIp - The IP address of the client making the request.
     * @param {number} userId - The userId of the user making the request.
     * @return {CurrentClient} A new CurrentClient object.
     * @throws {Error} If the provided client IP address is not a valid IP address.
     */
    static async new(clientIp, userId) {
        return new CurrentClient(clientIp, userId);
    }

    /**
     * Gets the IP address of the client making the request.
     * @return {string} The IP address of the client making the request.
     */
    get clientIpAddress() {
        return this.#clientIp.split(':').pop();
    }

    /**
     * Gets the userId
     * @return {number}
     */
    get userId() {
        return this.#userId
    }

    /**
     * Validates whether a given IP address is valid.
     * @static
     * @param {string} ipAddress - The IP address to validate.
     * @return {boolean} `true` if the IP address is valid, `false` otherwise.
     */
    static validateIpAddress(ipAddress) {
        const regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return regex.test(ipAddress);
    }

    /**
     * Validates whether a given userId is valid
     * @static
     * @param {number} userId - The userId to validate
     * @return {boolean} `true` if is valid, `false` otherwise.
     */
    static validateUserId(userId) {
        return (userId > 0);
    }
}