import {requiredHeadersAreSet} from "./api/requiredHeadersAreSet.mjs";
import {isAuthenticated} from "./api/isAuthenticated.mjs";
import {isClientIpAddressAllowed} from "./api/isClientIpAddressAllowed.mjs";
import {sendError} from "./api/errorHandlers.mjs";
import {CurrentHeaders} from "./CurrentHeaders.mjs";
import {CurrentClient} from "./CurrentClient.mjs";

/**
 * @param {HttpPolicyConfig} httpPolicyConfig
 * @param req
 * @param res
 * @return {Promise<boolean>}
 */
export async function authorize(httpPolicyConfig, req, res) {
    if (!requiredHeadersAreSet(req.headers, httpPolicyConfig.requiredHeaders)) {
        console.log('failed requiredHeadersAreSet');
        sendError(res, 403)
        return false;
    }

    const currentHeaders = await CurrentHeaders.new(req.headers[httpPolicyConfig.headerNames.userId]);
    if (!isAuthenticated(currentHeaders.xFluxIliasRestApiUserId)) {
        console.log('failed isAuthenticated');
        sendError(res, 403)
        return false;
    }

    const currentClient = await CurrentClient.new(req.socket.remoteAddress, currentHeaders.xFluxIliasRestApiUserId);
    if (!isClientIpAddressAllowed(currentClient.clientIpAddress, httpPolicyConfig.allowedIps)) {
        console.log(currentClient.clientIpAddress);
        console.log('failed isClientIpAddressAllowed');
        sendError(res, 403)
        return false;
    }

    return true;
}