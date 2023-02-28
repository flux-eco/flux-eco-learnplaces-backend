// repositoryTreeHandler.js
import { MySqlConnection } from "mysql2/promise";

/**
 * Handles the 'getRepositoryTree' action by retrieving the repository tree from a MySQL database.
 */
export class RepositoryTreeHandler {

    #handleQuery

    /**
     * Creates a new instance of the RepositoryTreeHandler.
     * @param {function} handleQuery
     */
    constructor(handleQuery) {
        this.#handleQuery = handleQuery;
    }

    /**
     * Retrieves the repository tree from the MySQL database.
     * @returns {Promise<any[]>} - A Promise that resolves to an array of repository objects.
     */
    async handle() {
        try {
            return this.#handleQuery()
        } catch (error) {
            console.error("Error retrieving repository tree", error);
            throw error;
        }
    }
}