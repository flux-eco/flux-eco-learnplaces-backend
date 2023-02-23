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
        switch (request.url) {
            case '/repositoryTree':
                if (request.method === 'GET') {
                    try {
                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'application/json');
                        const handleResponse = (result) => { response.end(JSON.stringify(result))};
                        await this.#service.getRepositoryTree(handleResponse);
                    } catch (error) {
                        response.statusCode = 500;
                        response.setHeader('Content-Type', 'application/json');
                        response.end(JSON.stringify({ error: error.message }));
                    }
                } else {
                    response.statusCode = 405;
                    response.end();
                }
                break;
            default:
                response.statusCode = 404;
                response.end();
        }
    }
}