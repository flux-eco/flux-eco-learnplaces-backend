/**
 * @typedef {Object} TreeNode
 * @property {string|null} parentId
 * @property {string} nodeId
 * @property {object} nodeData
 */
import {IliasMysqlRepository} from "../../Adapters/Ilias/IliasMysqlRepository.mjs";


export class Service {

    /**
     * @param {IliasMysqlRepository} iliasMysqlRepository
     * @return {Service}
     */
    constructor(iliasMysqlRepository) {
        this.iliasMysqlRepository = iliasMysqlRepository;
    }

    /**
     * @param {IliasMysqlRepository} iliasMysqlRepository
     * @return {Service}
     */
    static async new(iliasMysqlRepository) {
        return new Service(iliasMysqlRepository)
    }

    async getRepositoryTree() {
        //todo
        return this.iliasMysqlRepository.getRepositoryTree();
    }
}