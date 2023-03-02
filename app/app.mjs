import {FluxEcoHttpServer} from './../../flux-eco-http-server/app/server/FluxEcoHttpServer.mjs';
import {FluxEcoQueryActionsApi} from './../../flux-eco-query-actions/app/src/Adapters/Api/FluxEcoQueryActionsApi.mjs';
import {CheckPoliciesMiddleware} from "../../flux-eco-http-server/app/middlewares/CheckPoliciesMiddleware.mjs";
import {StaticFileMiddleware} from "../../flux-eco-http-server/app/middlewares/StaticFileMiddleware.mjs";
import {ActionsMiddleware} from "../../flux-eco-http-server/app/middlewares/ActionsMiddleware.mjs";
import {FluxEcoLearnplacesBackendApi} from "./src/Adapters/Api/FluxEcoLearnplacesBackendApi.mjs";


async function app() {
    const appConfig = new FluxEcoConfig(JSON.parse(await import("./config/fluxEcoConfig.json")));

    const queryActionApi = await FluxEcoQueryActionsApi.newMysqlSourceQueryActions(
        appConfig.bindings.iliasDatabase
    );

    const boundedActions = {
        "getRepositoryTree": () => queryActionApi.getRepositoryTree()
    };

    const learnplacesApi = FluxEcoLearnplacesBackendApi.new(boundedActions);

    const handleAction = (actionName, actionParams) => {
        if (learnplacesApi.constructor.hasOwnProperty(actionName)) {
            return learnplacesApi[actionName](...actionParams)
        }
    }

    // Create a new instance of MiddlewareChain and Config classes and create an instance of FluxEcoHttpServer
    const middlewareChain = new MiddlewareChain(
        [
            CheckPoliciesMiddleware.new(appConfig.server),
            StaticFileMiddleware.new(appConfig.server),
            ActionsMiddleware.new(appConfig.server, handleAction)
        ]
    );
    const server = await FluxEcoHttpServer.new(appConfig.server, middlewareChain);
    // Start the server
    server.start();
}

app();
