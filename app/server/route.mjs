import {FluxEcoLearnplacesBackendApi} from "../src/Adapters/Api/FluxEcoLearnplacesBackendApi.mjs";
import {sendError} from "./api/errorHandlers.mjs";
import {sendResponseJson} from "./api/sendResponseJson.mjs";
import {actionExists} from "./api/actionExists.mjs";

export async function route(req, res) {
    const method = req.method;
    const requestPath = req.requestUrl;

    
    if (method === 'GET') {
        //const pathFragments = requestPath.split('/');
        //const actionName = pathFragments[pathFragments.length - 1];
        const api = await FluxEcoLearnplacesBackendApi.new();
        console.log(api);
        /*if (!actionExists(api, actionName)) {
            sendError(res, 404)
            return;
        }*/
        const actionName = "getRepositoryTree"
        const result = await api[actionName]();
        const responseMessage = {code: 200, message: JSON.stringify(result)};
        sendResponseJson(res, responseMessage)
    } else {
        sendError(res, 404)
    }
}