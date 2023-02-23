//todo replace with flux-http-api

const http = await import('http');
const {mysqlConfig, serverConfig} = await import('../config.mjs');
const mysqlDriver = await (await import('./src/Adapters/Mysql/MysqlDriver.mjs')).MysqlDriver.new(mysqlConfig);
const connection = await mysqlDriver.connect();
console.log(connection);
const httpAdapter = await (await import('./src/Adapters/Api/HttpApi.mjs')).HttpApi.new(connection)


const server = http.createServer((request, response) => {
    httpAdapter.handleRequest(request, response);
});

server.listen(serverConfig.port, () => {
    console.log(`Server listening on port ${serverConfig.port}`);
});