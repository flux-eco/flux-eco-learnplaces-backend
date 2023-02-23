const mysql = await import('mysql');

export class MysqlDriver {
    #config;

    constructor(config) {
        this.#config = config;
    }

    /**
     * @param config
     * @return {Promise<MysqlDriver>}
     */
    static async new(config) {
        return new MysqlDriver(config)
    }

    async connect() {
        this.connection = mysql.createConnection(this.#config);
        await this.connection.connect((error) => {console.log(error)});
        return this.connection;
    }

    async disconnect() {
        this.connection.end((error) => {});
    }
}