/**
 * @param {FluxEcoLearnplacesBackendApi} api
 * @param {string} actionName
 * @return {boolean}
 */
export const actionExists = function (api, actionName) {
    return (api.constructor.prototype.hasOwnProperty(actionName));
};