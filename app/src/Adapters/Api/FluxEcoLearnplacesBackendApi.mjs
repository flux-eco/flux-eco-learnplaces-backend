import {Service} from "../../Core/Ports/Service.mjs";
import {FluxEcoLearnplacesBackendConfig} from "../../../config/FluxEcoLearnplacesBackendConfig.mjs";
import {AppConfig} from "../Configs/AppConfig.mjs";
import {IliasMysqlRepository} from "../Ilias/IliasMysqlRepository.mjs";
import {FluxEcoJsActionsApi} from "../../../../../flux-eco-js-actions/app/src/Adapters/FluxEcoJsActionsApi.mjs";



export class FluxEcoLearnplacesBackendApi {
    #service

    /**
     * @private
     * @param service
     */
    constructor(service) {
        this.#service = service;
    }

    static async new() {
        const appConfig = await AppConfig.fromAppConfig(FluxEcoLearnplacesBackendConfig);


        const api = await FluxEcoJsActionsApi.new();

        const service = await api.fluxEcoUiTreeApi.service;
        const result = await service.createRenderTreeOnNodesProvidedCallback('userId', 123, "dd", "dsfdsf").execute();


        //todo
        const databaseConfig = JSON.parse(process.env['ILIAS_DATABASE_SERVER']);
        return new FluxEcoLearnplacesBackendApi(await Service.new(await IliasMysqlRepository.new(databaseConfig)))
    }

    async getRepositoryTree() {
        //todo
        return this.#service.getRepositoryTree();
    }
}