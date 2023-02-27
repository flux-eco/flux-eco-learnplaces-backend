/**
* Sends an error response to the client.
*
* @param {ServerResponse} res The response object.
* @param {{ code: number, message: string }} responseMessage The error message object.
* @returns {void}
*/
export const sendResponseJson = function sendResponseJson(res, responseMessage) {
    res.writeHead(responseMessage.code, {'Content-Type': 'application/json'});
    res.write(responseMessage.message);
    res.end();
}