import {Api} from "./src/Adapters/Api/Api.mjs";
import {FluxEcoQueryActionsApi} from './../../flux-eco-query-actions/app/src/Adapters/Api/FluxEcoQueryActionsApi.mjs';

export class FluxEcoLearnplacesBackend {

    #api;
    #configs;
    #boundActions;
    outbounds;

    constructor(iliasDatabase) {
        this.configs = {
            iliasDatabase: iliasDatabase,
        }

        Api.new(this.#boundActions);

        this.outbounds = {
            getRepositoryTree: (this.#configs.iliasDatabase) = {
                iliasDatabase.getRepositoryTree()
            }
        }
        this.#boundActions = {
            getRepositoryTree: (outbounds) => {
                outbounds.get
            }
        }
    }



    core = {
        getRepositoryTree: {

        }
    }

}