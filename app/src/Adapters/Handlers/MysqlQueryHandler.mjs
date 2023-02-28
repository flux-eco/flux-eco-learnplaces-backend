import { createPool } from 'mysql2/promise';

/**
 * Handles queries to the MySQL database.
 */
export class MysqlQueryHandler {
    /**
     * Creates an instance of the MySQL query handler.
     * @param {Object} config - The configuration object for the MySQL connection.
     */
    constructor(config) {
        this.pool = createPool(config);
    }

    /**
     * Retrieves the repository tree from the database.
     * @returns {Promise<Array>} - The repository tree as an array of objects.
     */
    async handle() {
        try {
            const [rows] = await this.pool.query('SELECT * FROM repository_tree');
            return rows;
        } catch (err) {
            console.error('Error retrieving repository tree from the database.', err);
            throw err;
        }
    }
}
