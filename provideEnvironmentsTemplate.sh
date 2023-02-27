#!/bin/bash
export HTTP_ENDPOINT_SERVER='{"protocol": "http", "host": "localhost", "port": 3200}'
export HTTP_ENDPOINT_POLICY='{"allowedIps": ["192.168.1.1", "10.0.0.1"], "requiredHeaders": ["x-flux-ilias-rest-api-user-id"], "headerNames": {"userId": "x-flux-ilias-rest-api-user-id" }}'
export ILIAS_DATABASE_SERVER='{"host": "localhost", "port": 3306, "database": "someDatabase", "user": "someUser", "password": "theUserPassword"}''
export ILIAS_REST_API_SERVER='{}'