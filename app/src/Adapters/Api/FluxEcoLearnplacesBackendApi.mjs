export class FluxEcoLearnplacesBackendApi {
    /**
     * @param {string, function} boundActions
     */
    #boundActions
    /**
     * @param {RepositoryTreeHandler}
     */
    #repositoryTreeHandler

    /**
     * @param {{string, function}} boundActions
     */
    constructor(boundedActions) {
           this.#boundActions = boundedActions
    }

    /**
     * @param {{string, function}} boundActions
     * @return {Promise<FluxEcoLearnplacesBackendApi>}
     */
    static async new(boundedActions) {
        return new FluxEcoLearnplacesBackendApi(boundedActions);
    }

    /**
     * Returns the repository tree.
     * @returns {Promise<Object>}
     */
    async getRepositoryTree() {
        return await this.#boundActions.getRepositoryTree();
    }

}
