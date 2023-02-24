/**
 * @type {AppConfigs}
 */
export class AppConfigs {

    /**
     * @var {EndpointConfigs}
     */
    #endpointConfigs
    /**
     * @var {BindingConfigs}
     */
    #bindingConfigs
    /**
     * @var {DatabaseConfigs}
     */
    #databaseConfigs


    /**
     * @param {EndpointConfigs} endpointConfigs
     * @param {BindingConfigs} bindingConfigs
     * @param {DatabaseConfigs} databaseConfigs
     */
    constructor(
        endpointConfigs,
        bindingConfigs,
        databaseConfigs
    ) {
        this.#endpointConfigs = endpointConfigs;
        this.#bindingConfigs = bindingConfigs;
        this.#databaseConfigs = databaseConfigs;
    }

    /**
     * @param {EndpointConfigs} endpointConfigs
     * @param {BindingConfigs} bindingConfigs
     * @param {DatabaseConfigs} databaseConfigs
     * @return {AppConfigs}
     */
    static async new(
        endpointConfigs,
        bindingConfigs,
        databaseConfigs
    ) {
        return new AppConfigs(endpointConfigs, bindingConfigs, databaseConfigs);
    }

    /**
     * @return {EndpointConfigs}
     */
    get endpointConfigs() {
        return this.#endpointConfigs
    }

    /**
     * @return {BindingConfigs}
     */
    get bindingConfigs() {
        return this.#bindingConfigs
    }

    /**
     * @return {DatabaseConfigs}
     */
    get databaseConfigs() {
        return this.#databaseConfigs
    }
}