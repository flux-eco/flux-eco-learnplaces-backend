/**
 * @typedef {import('mysql2').RowDataPacket} RowDataPacket
 * @typedef {import('mysql2').FieldPacket} FieldPacket
 */
const mysql = await import ('mysql2/promise');

/**
 * Database action handler that allows performing SQL queries on a database.
 */
export class FluxEcoMysqlActionHandler {
    /**
     * Creates a new DatabaseBinding instance.
     * @param {DatabaseServerConfig} config - The configuration for the database binding.
     */
    constructor(config) {
        this.config = config;
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: this.config.host,
            user: this.config.user,
            password: this.config.password,
            database: this.config.database,
            port: this.config.port
        });
    }

    static new(config) {
        return new FluxEcoMysqlActionHandler(config)
    }

    /**
     * Executes a query on the database.
     * @param {string} actionName - The name of the action to execute.
     * @param {Object} params - An object of parameters for the query.
     * @returns {Promise} A promise that resolves with the results of the query.
     */
    async handle(actionName, params) {
        const actionBinding = this.config.actions.find((action) => action.name === actionName);
        const sql = actionBinding.sql;
        const connection = await this.pool.getConnection();
        try {
            const [rows, fields] = await connection.execute(sql, params);
            return rows;
        } catch (error) {
            throw new Error(`Error executing query "${actionName}": ${error.message}`);
        } finally {
            connection.release();
        }
    }
}