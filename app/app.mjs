import Api from "./src/Adapters/Api/Api.mjs";
import {FluxEcoHttpServer} from './../../flux-eco-http-server/app/server/FluxEcoHttpServer.mjs';
import {FluxEcoQueryActionsApi} from './../../flux-eco-query-actions/app/src/Adapters/Api/FluxEcoQueryActionsApi.mjs';

async function app() {
    const appConfig = new FluxEcoConfig(JSON.parse(await import("./config/fluxEcoConfig.json")));

    const queryActionApi = await FluxEcoQueryActionsApi.newMysqlSourceQueryActions(
        serverConfig.iliasDatabase
    );
    const serverConfig = appConfig.getServerConfig();

    const boundedActions = {
        "getRepositoryTree": () => queryActionApi.getRepositoryTree()
    };
    const actions = {
        "getRepositoryTree": () => boundedActions.getRepositoryTree()
    }
    // Build the application

    // Create a new instance of MiddlewareChain and Config classes and create an instance of FluxEcoHttpServer
    const middlewareChain = new MiddlewareChain(appConfig.boundActions.middlewares);
    const server = await FluxEcoHttpServer.new(serverConfig, middlewareChain);
    // Start the server
    server.start();
}

app();
