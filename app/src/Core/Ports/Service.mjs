/**
 * @typedef {Object} TreeNode
 * @property {string|null} parentId
 * @property {string} nodeId
 * @property {object} nodeData
 */

/**
 * @typedef {object} Repository
 * @property {function(handleResponse)} getRepositoryTree
 */
export class Service {

    /**
     * @param {Repository} repository
     * @return {Service}
     */
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * @param {Repository} repository
     * @return {Service}
     */
    static async new(repository) {
        return new Service(repository)
    }

    async getRepositoryTree(handleResponse) {
        try {
           return this.repository.getRepositoryTree(handleResponse);
        } catch (error) {
            throw new Error(`Failed to get repository tree: ${error.message}`);
        }
    }
}