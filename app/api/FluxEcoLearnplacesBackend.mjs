export class FluxEcoLearnplacesBackend {
    /**
     * @type {FluxEcoLearnplacesBackendOutbounds}
     */
    #outbounds

    constructor(outbounds) {
        this.#outbounds = outbounds
    }

    /**
     * @return {FluxEcoLearnplacesBackend}
     */
    static new(outbounds) {
        return new FluxEcoLearnplacesBackend(outbounds);
    }

    readMainNavigationState() {
        this.#outbounds.readMainNavigationState()
    }

}