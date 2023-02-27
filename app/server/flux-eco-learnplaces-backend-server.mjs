import {ServerConfigs} from './config/ServerConfigs.mjs';
import {sendError} from './api/errorHandlers.mjs';
import {route} from "./route.mjs";
import {authorize} from "./authorize.mjs";
import {FluxEcoLearnplacesBackendConfig} from "../config/FluxEcoLearnplacesBackendConfig.mjs";

const http = await import('http');
const serverConfigs = await ServerConfigs.fromAppConfig(FluxEcoLearnplacesBackendConfig);

const server = http.createServer(async (req, res) => {
    const authorized = await authorize(serverConfigs.httpPolicyConfig, req, res);
    if (!authorized) {
        sendError(res, 403);
        return;
    }
    await route(req, res);
});

server.listen(serverConfigs.httpServerConfig.port, () => {
    console.log(`Server running at ${serverConfigs.httpServerConfig.basePath}`);
});