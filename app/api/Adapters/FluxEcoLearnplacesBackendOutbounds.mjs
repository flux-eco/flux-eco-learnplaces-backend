export class FluxEcoLearnplacesBackendOutbounds {
    /**
     * @type {FluxEcoQueryProcess}
     */
    #readMainNavigationStateQueryProcess;

    constructor(readMainNavigationStateQueryProcess) {
        this.#readMainNavigationStateQueryProcess = readMainNavigationStateQueryProcess;
    }

    static new(readMainNavigationStateQueryProcess) {
        return new FluxEcoLearnplacesBackendOutbounds(readMainNavigationStateQueryProcess);
    }

    /**
     * @returns {Promise<Object[]>}
     */
    readMainNavigationState() {
        this.#readMainNavigationStateQueryProcess.process();
    }


    resolveEnvVariables(object) {
        if (object === null) {
            return object;
        }

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
                resolved[key] = this.resolveEnvVariables(value);
            }
        }
        return resolved;
    }
}