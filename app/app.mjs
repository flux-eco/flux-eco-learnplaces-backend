#!/usr/bin/env node
import fs from "node:fs";
import {FluxEcoHttpServer} from './../../flux-eco-http-server/app/server/FluxEcoHttpServer.mjs';
import {FluxEcoQueryActionsApi} from './../../flux-eco-query-actions/app/src/Adapters/Api/FluxEcoQueryActionsApi.mjs';
import {CheckPoliciesMiddleware} from "../../flux-eco-http-server/app/middlewares/CheckPoliciesMiddleware.mjs";
import {StaticFileMiddleware} from "../../flux-eco-http-server/app/middlewares/StaticFileMiddleware.mjs";
import {ActionsMiddleware} from "../../flux-eco-http-server/app/middlewares/ActionsMiddleware.mjs";
import {FluxEcoLearnplacesBackendApi} from "./src/Adapters/Api/FluxEcoLearnplacesBackendApi.mjs";
import {FluxEcoConfig} from "./config/FluxEcoConfig.mjs";
import {MiddlewareChain} from "../../flux-eco-http-server/app/middlewares/MiddlewareChain.mjs";


async function app() {
    const jsonString = fs.readFileSync("./config/fluxEcoConfig.json", 'utf-8');
    const configObject = JSON.parse(jsonString);
    const resolvedConfigObject = resolveEnvVariables(configObject);
    const appConfig = await FluxEcoConfig.new(resolvedConfigObject);

    // console.log(appConfig.httpEndpoints);

    console.log(appConfig.bindings);

    const queryActionApi = await FluxEcoQueryActionsApi.newMysqlSourceQueryActions(
        appConfig.bindings.iliasDatabase
    );

    const boundedActions = {
        getRepositoryTree: async () => {
            const action = await appConfig.bindings.iliasDatabase.boundActions.getRepositoryTree;
            /**
             * @type QueryMysqlDataSource
             */
            return await queryActionApi[action.actionName](
                action.actionParameters
            );
        }
    };

    const learnplacesApi = await FluxEcoLearnplacesBackendApi.new(boundedActions);

    const handleAction = async (actionName, actionParams) => {
        if (learnplacesApi[actionName] && learnplacesApi[actionName] instanceof Function && learnplacesApi.constructor.prototype.hasOwnProperty(actionName)) {
            if (actionParams) {
                return await learnplacesApi[actionName](...actionParams)
            }
            return await learnplacesApi[actionName]()
        } else {
            console.log("action not extists " + actionName);
            console.log(actionName);
            return false;
        }
    }

    console.log(appConfig.httpEndpoints);

    // Create a new instance of MiddlewareChain and Config classes and create an instance of FluxEcoHttpServer
    const middlewareChain = new MiddlewareChain(
        [
            CheckPoliciesMiddleware.new(appConfig.httpEndpoints),
            StaticFileMiddleware.new(appConfig.httpEndpoints),
            ActionsMiddleware.new(appConfig.httpEndpoints, handleAction)
        ]
    );
    const server = await FluxEcoHttpServer.new(appConfig.httpEndpoints, middlewareChain);
    // Start the server
    server.start();
}

function resolveEnvVariables(object) {
    if (typeof object !== 'object') {
        return object;
    }

    const resolved = Array.isArray(object) ? [] : {};

    for (const [key, value] of Object.entries(object)) {
        if (typeof value === 'string' && value.startsWith('$')) {
            const envVar = value.slice(1);
            const envVarName = envVar.replace(/[{}]/g, '');
            resolved[key] = process.env[envVarName];
        } else {
            resolved[key] = resolveEnvVariables(value);
        }
    }

    return resolved;
}

app();
