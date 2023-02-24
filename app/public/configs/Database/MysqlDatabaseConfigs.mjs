/**
 * @type MysqlDatabaseConfigs
 */
export class MysqlDatabaseConfigs {
    #host
    #port
    #database
    #user
    #password

    constructor(
        host,
        port,
        database,
        user,
        password
    ) {
        this.#host = host;
        this.#port = port;
        this.#database = database;
        this.#user = user;
        this.#password = password;
    }

    /**
     * @return {MysqlDatabaseConfigs}
     */
    static async new(
        host,
        port,
        database,
        user,
        password
    ) {
        return new MysqlDatabaseConfigs(
            host,
            port,
            database,
            user,
            password
        )
    }

    get host() {
        return this.#host
    }
    get port() {
        return this.#port
    }
    get database() {
        return this.#database
    }
    get user() {
        return this.#user
    }
    get password() {
        return this.#password
    }
}