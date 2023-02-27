/**
 * @param {object} requestHeaders - Object representing the headers in the incoming request
 * @param {array} requiredHeaders - Array of header names that are required in the request
 * @return {boolean} - Returns true if all required headers are set, otherwise false
 */
export const requiredHeadersAreSet = function(requestHeaders, requiredHeaders) {
    for (let header of requiredHeaders) {
        if (!requestHeaders[header]) {
            return false;
        }
    }
    return true;
};