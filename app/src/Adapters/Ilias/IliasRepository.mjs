//todo add an additional connection to the ilias restApi
export class IliasRepository {
    #connection;

    constructor(connection) {
        this.#connection = connection;
    }

    /**
     * @param connection
     * @return {IliasRepository}
     */
    static async new(connection) {
        return new IliasRepository(connection);
    }

    /**
     * @typedef {Object} TreeNode
     * @property {string|null} parentId
     * @property {string} nodeId
     * @property {object} nodeData
     */
    async getRepositoryTree(callback) {
        const query = 'SELECT * FROM object_data ' +
            'inner join object_reference as ref on ref.obj_id = object_data.obj_id ' +
            'inner join tree on tree.child = ref.ref_id ' +
            'where ref.deleted is null and (type = "cat" or type = "crs")';
        await this.#connection.query(query, (error, results, fields) => {
            if (error) {
                console.error(`Failed to execute MySQL query: ${error.message}`);
                return;
            }

            const response = [];
            results.forEach(data => {

                let parent = data.parent;
                if (data.parent === 1) {
                    parent = null;
                }

                response.push(
                    {
                        parentId: parent,
                        nodeId: data.ref_id,
                        nodeData: {label: data.title}
                    }
                )
            });

            callback(response);
        });
    }
}