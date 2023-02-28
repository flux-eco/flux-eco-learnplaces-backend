import Api from "./src/Adapters/Api/Api.mjs";
import { FluxEcoHttpServer } from './../../flux-eco-http-server/app/server/FluxEcoHttpServer.mjs';

async function app() {
    const appConfig = JSON.parse(await import("./config/appConfig.json"));
    const api = Api.new();

    // Create a new instance of MiddlewareChain and Config classes
    const middlewareChain = new MiddlewareChain(appConfig.endpoints.middlewares);
    const serverConfig = new ServerConfig(appConfig, {
        "getRepositoryTree": () => api.getRepositoryTree(),
    });

    // Create an instance of FluxEcoHttpServer
    const server = await FluxEcoHttpServer.new(serverConfig, middlewareChain);
    // Start the server
    server.start();
}

app();
