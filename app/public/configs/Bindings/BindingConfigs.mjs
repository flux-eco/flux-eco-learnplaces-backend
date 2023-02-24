/**
 * @type BindingConfigs
 */
export class BindingConfigs {
    /**
     * @var {null|HttpEndpointConfig}
     */
    #backendBinding;

    /**
     * @param  {HttpEndpointConfig} backendBinding
     */
    constructor(
        backendBinding
    ) {
        this.#backendBinding = backendBinding;
    }

    /**
     * @param {null|HttpEndpointConfig} backendBinding
     * @return {BindingConfigs}
     */
    static async new(
        backendBinding= null
    ) {
        return new BindingConfigs(
            backendBinding
        )
    }

    /**
     * @return {HttpEndpointConfig}
     */
    get backendBinding() {
        return this.#backendBinding
    }
}