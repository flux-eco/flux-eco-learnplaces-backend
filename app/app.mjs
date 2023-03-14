#!/usr/bin/env node
import fs from "node:fs";
import {FluxEcoNodeHttpServer} from "./api/flux-eco-node-http-server/server/FluxEcoNodeHttpServer.mjs";
import {FluxEcoLearnplacesBackendOutbounds} from "./api/Adapters/FluxEcoLearnplacesBackendOutbounds.mjs";
import {FluxEcoLearnplacesBackend} from "./api/FluxEcoLearnplacesBackend.mjs";
import FluxEcoQueryProcess from "./api/flux-eco-query-process/FluxEcoQueryProcess.mjs";


const readFile = (filePath) => {
    const httpServerConfigBuffer = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(httpServerConfigBuffer.toString());
}

async function app() {
    const fluxEcoQueryActionsConfigs = readFile("./api/configs/flux-eco-query-process-config.json");
    const outbounds = FluxEcoLearnplacesBackendOutbounds.new(
        FluxEcoQueryProcess.new(fluxEcoQueryActionsConfigs)
    );

    const backendApi = await FluxEcoLearnplacesBackend.new(outbounds);

    const serverSettings = readFile("./api/configs/flux-eco-node-http-server-config.json");
    const resolvedServerSettings = outbounds.resolveEnvVariables(serverSettings);
    const server = await FluxEcoNodeHttpServer.new(resolvedServerSettings, backendApi);
    // Start the server
    server.start();
}

app();
