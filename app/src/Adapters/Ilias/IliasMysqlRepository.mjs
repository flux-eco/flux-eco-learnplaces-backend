import {Database} from "./Database.mjs";

export class IliasMysqlRepository {
    /**
     * @var {Database}
     */
    #database;

    /**
     * @param {Database} database
     */
    constructor(database) {
        this.#database = database;
    }

    /**
     * @param  config
     * @return {IliasMysqlRepository}
     */
    static async new(config) {
        return new IliasMysqlRepository(new Database(config));
    }

    /**
     * @typedef {Object} TreeNode
     * @property {string|null} parentId
     * @property {string} nodeId
     * @property {object} nodeData
     */
    async getRepositoryTree() {
        const sql = 'SELECT * FROM object_data ' +
            'inner join object_reference as ref on ref.obj_id = object_data.obj_id ' +
            'inner join tree on tree.child = ref.ref_id ' +
            'where ref.deleted is null and (type = "cat" or type = "crs")';

        const results = await this.#database.query(sql);
        const nodes = [];
        results.forEach(data => {
            let parent = data.parent;
            if (data.parent === 1) {
                parent = null;
            }
            nodes.push(
                {
                    parentId: parent,
                    nodeId: data.ref_id,
                    nodeData: {label: data.title}
                }
            )
        });
        return nodes;
    }
}