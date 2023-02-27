import {HttpServerConfig} from "./HttpServerConfig.mjs";

/**
 * @type {ServerConfigs}
 */
export class ServerConfigs {
    /**
     * @var {HttpServerConfig}
     */
    #httpServerConfig

    /**
     * @var {HttpPolicyConfig}
     */
    #httpPolicyConfig

    /**
     * @param {HttpServerConfig} httpServerConfig
     * @param {HttpPolicyConfig} httpPolicyConfig
     */
    constructor(
        httpServerConfig,
        httpPolicyConfig,
    ) {
        this.#httpServerConfig = httpServerConfig;
        this.#httpPolicyConfig = httpPolicyConfig;
    }

    /**
     * @param {FluxEcoAppConfig} appConfig
     */
    static async fromAppConfig(appConfig) {
        return new ServerConfigs(
            await HttpServerConfig.fromConfigObject(JSON.parse(process.env[appConfig.endpoints.http.serverConfigId])),
            JSON.parse(process.env[appConfig.endpoints.http.policyConfigId])
        );
    }

    /**
     * @return {HttpServerConfig}
     */
    get httpServerConfig() {
        return this.#httpServerConfig
    }

    /**
     * @return {HttpPolicyConfig}
     */
    get httpPolicyConfig() {
        return this.#httpPolicyConfig
    }
}