//todo replace with flux-http-api
import {AppConfigs} from "./public/configs/AppConfigs.mjs";
import {EndpointConfigs} from "./public/configs/Endpoints/EndpointConfigs.mjs";
import {HttpEndpointConfig} from "./public/configs/Endpoints/HttpEndpointConfig.mjs";
import {BindingConfigs} from "./public/configs/Bindings/BindingConfigs.mjs";
import {DatabaseConfigs} from "./public/configs/Database/DatabaseConfigs.mjs";
import {MysqlDatabaseConfigs} from "./public/configs/Database/MysqlDatabaseConfigs.mjs";
const http = await import('http');

const endpointConfigs = await EndpointConfigs.new(
    await HttpEndpointConfig.new(
        process.env.FLUX_ECO_LEARNPLACES_BACKEND_ENDPOINTS_HTTP_PROTOCOL,
        process.env.FLUX_ECO_LEARNPLACES_BACKEND_ENDPOINTS_HTTP_HOST,
        process.env.FLUX_ECO_LEARNPLACES_BACKEND_ENDPOINTS_HTTP_PORT
    )
);
const bindingConfigs = await BindingConfigs.new();
const databaseConfigs = await DatabaseConfigs.new(
    await MysqlDatabaseConfigs.new(
        process.env.FLUX_ECO_LEARNPLACES_BACKEND_DATABASE_MYSQL_HOST,
        process.env.FLUX_ECO_LEARNPLACES_BACKEND_DATABASE_MYSQL_PORT,
        process.env.FLUX_ECO_LEARNPLACES_BACKEND_DATABASE_MYSQL_NAME,
        process.env.FLUX_ECO_LEARNPLACES_BACKEND_DATABASE_MYSQL_USER,
        process.env.FLUX_ECO_LEARNPLACES_BACKEND_DATABASE_MYSQL_PASSWORD,
    )
);
const appConfigs = await AppConfigs.new(endpointConfigs, bindingConfigs, databaseConfigs)

const mysqlDriver = await (await import('./src/Adapters/Mysql/MysqlDriver.mjs')).MysqlDriver.new(appConfigs.databaseConfigs.msyqlDatabaseConfig);
const httpAdapter = await (await import('./src/Adapters/Api/HttpApi.mjs')).HttpApi.new(await mysqlDriver.connect())

const server = http.createServer((request, response) => {
    httpAdapter.handleRequest(request, response);
});


server.listen(appConfigs.endpointConfigs.httpEndpointConfig.port, () => {
    console.log('Server running at ' + appConfigs.endpointConfigs.httpEndpointConfig.basePath);
});