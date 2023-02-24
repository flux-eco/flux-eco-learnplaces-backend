import {MysqlDatabaseConfigs} from "./MysqlDatabaseConfigs.mjs";

/**
 * @type DatabaseConfigs
 */
export class DatabaseConfigs {
    /**
     * @var {null|MysqlDatabaseConfigs}
     */
    #mysqlDatabaseConfigs = null;

    /**
     * @param  {MysqlDatabaseConfigs} mysqlDatabaseConfigs
     */
    constructor(
        mysqlDatabaseConfigs
    ) {
        this.#mysqlDatabaseConfigs = mysqlDatabaseConfigs;
    }

    /**
     * @param {MysqlDatabaseConfigs} mysqlDatabaseConfigs
     * @return {DatabaseConfigs}
     */
    static async new(
        mysqlDatabaseConfigs
    ) {
        return new DatabaseConfigs(
            mysqlDatabaseConfigs
        )
    }

    /**
     * @return {null|MysqlDatabaseConfigs}
     */
    get msyqlDatabaseConfig() {
        return this.#mysqlDatabaseConfigs
    }
}