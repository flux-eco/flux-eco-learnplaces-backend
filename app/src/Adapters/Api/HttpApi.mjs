import {Service} from "../../Core/Ports/Service.mjs";
import {IliasRepository} from "../Ilias/IliasRepository.mjs";

export class HttpApi {
    #service
    constructor(service) {
        this.#service = service;
    }

    static async new(connection) {
        return new HttpApi(await Service.new(await IliasRepository.new(connection)))
    }

    async handleRequest(request, response) {
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Access-Control-Allow-Origin', '*'); // Erlaube alle Ursprünge (NICHT in Produktionsumgebungen verwenden!)
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

        if (request.method === 'OPTIONS') {
            response.statusCode = 200;
            response.end()
            return;
        }

        switch (request.url) {
            case '/repositoryTree':
                if (request.method === 'GET') {
                    try {
                        response.statusCode = 200;
                        const handleResponse = (result) => { response.end(JSON.stringify(result))};
                        await this.#service.getRepositoryTree(handleResponse);
                        return;
                    } catch (error) {
                        response.statusCode = 500;
                        response.setHeader('Content-Type', 'application/json');
                        response.end(JSON.stringify({ error: error.message }));
                        return;
                    }
                } else {
                    response.statusCode = 405;
                    response.end();
                    return;
                }
                break;
            default:
                response.statusCode = 404;
                response.end();
        }
    }
}