/**
 * @typedef {import('mysql2').RowDataPacket} RowDataPacket
 * @typedef {import('mysql2').FieldPacket} FieldPacket
 */
const mysql = await import('mysql2/promise');

export class Database {
    /**
     * @param {Object} config - Configuration object for the database.
     * @param {string} config.host - The hostname of the database you are connecting to.
     * @param {number} config.port - Port number to use for the connection.
     * @param {string} config.user - The MySQL user to authenticate as.
     * @param {string} config.password - The password of that MySQL user.
     * @param {string} config.database - Name of the database to use for this connection.
     */
    constructor(config) {
        this.pool = mysql.createPool(config);
    }

    /**
     * Execute a SQL query and return the results.
     * @param {string} sql - The SQL query to execute.
     * @param {any[]} [params] - An optional array of parameters to replace placeholders in the SQL query.
     * @returns {Promise<[RowDataPacket[], FieldPacket[]]>} A promise that resolves to an array containing the rows and fields returned by the query.
     */
    async query(sql, params) {
        const connection = await this.pool.getConnection();
        try {
            const [results,fields] = await connection.query(sql, params);
            return results;
        } finally {
            connection.release();
        }
    }

    /**
     * Begin a transaction.
     * @returns {Promise<void>} A promise that resolves when the transaction has started.
     */
    async beginTransaction() {
        const connection = await this.pool.getConnection();
        await connection.beginTransaction();
        connection.release();
    }

    /**
     * Commit a transaction.
     * @returns {Promise<void>} A promise that resolves when the transaction has been committed.
     */
    async commit() {
        const connection = await this.pool.getConnection();
        await connection.commit();
        connection.release();
    }

    /**
     * Rollback a transaction.
     * @returns {Promise<void>} A promise that resolves when the transaction has been rolled back.
     */
    async rollback() {
        const connection = await this.pool.getConnection();
        await connection.rollback();
        connection.release();
    }
}