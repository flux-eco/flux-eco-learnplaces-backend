//todo replace with flux-http-api
import fs from "fs";
const http = await import('http');
const {mysqlConfig} = await import('../config.mjs');
const mysqlDriver = await (await import('./src/Adapters/Mysql/MysqlDriver.mjs')).MysqlDriver.new(mysqlConfig);
const connection = await mysqlDriver.connect();

const definition = JSON.parse(fs.readFileSync('definitions/flux-eco-definition.json', 'utf8'));

const httpAdapter = await (await import('./src/Adapters/Api/HttpApi.mjs')).HttpApi.new(connection)

const server = http.createServer((request, response) => {
    httpAdapter.handleRequest(request, response);
});

server.listen(definition.bindings.backendServer.port, () => {
    console.log(`Server listening on port ${definition.bindings.backendServer.port}`);
});