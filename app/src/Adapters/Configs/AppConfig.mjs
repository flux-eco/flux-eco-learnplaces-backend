/**
 * @type {FluxEcoAppConfig}
 */
export class AppConfig {
    /**
     * @var {Object<string, FluxEcoHttpEndpoint>}
     */
    #endpoints
    /**
     * @var {Object<string, FluxEcoBinding>}
     */
    #binidings

    /**
     * @param endpoints
     * @param binidings
     */
    constructor(
        endpoints,
        binidings,
    ) {
        this.#endpoints = endpoints;
        this.#binidings = binidings;
    }

    /**
     * @param {FluxEcoAppConfig} appConfig
     */
    static async fromAppConfig(appConfig) {
        return new AppConfig(
            appConfig.endpoints,
            appConfig.endpoints
        );
    }

    /**
     * @return {Object<string, FluxEcoHttpEndpoint>}
     */
    get endpoints() {
        return this.#endpoints
    }

    /**
     * @return {Object<string, FluxEcoBinding>}
     */
    get binidings() {
        return this.#binidings
    }
}