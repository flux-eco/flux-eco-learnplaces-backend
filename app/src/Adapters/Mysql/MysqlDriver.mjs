const mysql = await import('mysql');

export class MysqlDriver {
    /**
     * @var {MysqlDatabaseConfigs}
     */
    #configs;
    #connection;

    /**
     * @param {MysqlDatabaseConfigs} configs
     */
    constructor(configs) {
        this.#configs = configs;
    }

    /**
     * @param {MysqlDatabaseConfigs} configs
     * @return {Promise<MysqlDriver>}
     */
    static async new(configs) {
        return new MysqlDriver(configs)
    }

    /**
     * @return {Promise<Connection>}
     */
    async connect() {
        this.#connection = await mysql.createConnection(
            this.#configs
        );
        await this.#connection.connect((error) => {
            console.log(error);
        });
        return this.#connection;
    }

    async disconnect() {
        this.#connection.end((error) => {
            console.log(error);
        });
    }
}