import {Service} from "../../Core/Ports/Service.mjs";
import {FluxEcoLearnplacesBackendConfig} from "../../../config/FluxEcoLearnplacesBackendConfig.mjs";
import {AppConfig} from "../Configs/AppConfig.mjs";
import {IliasMysqlRepository} from "../Ilias/IliasMysqlRepository.mjs";

export class FluxEcoLearnplacesBackendApi {
    #service
    constructor(service) {
        this.#service = service;
    }

    static async new() {
        const appConfig = await AppConfig.fromAppConfig(FluxEcoLearnplacesBackendConfig);
        //todo
        const databaseConfig = JSON.parse(process.env['ILIAS_DATABASE_SERVER']);
        return new FluxEcoLearnplacesBackendApi(await Service.new(await IliasMysqlRepository.new(databaseConfig)))
    }

    async getRepositoryTree() {
        //todo
        return this.#service.getRepositoryTree();
    }
}