class Api {
    /**
     * @param {string, function} boundActions
     */
    #boundActions
    /**
     * @param {RepositoryTreeHandler}
     */
    #repositoryTreeHandler

    /**
     * @param {string, function} boundActions
     */
    constructor(boundActions) {
        this.#boundActions = boundActions
        this.#repositoryTreeHandler = RepositoryTreeHandler.new();
    }

    /**
     * @param {string, function} boundActions
     * @return {Promise<Api>}
     */
    static async new(boundActions) {
        return new Api(boundActions);
    }

    /**
     * Returns the repository tree.
     * @returns {Promise<Object>}
     */
    async getRepositoryTree() {
        return this.repositoryTreeHandler.getRepositoryTree(this.#boundActions.getRepositoryTree);
    }
}

module.exports = Api;

