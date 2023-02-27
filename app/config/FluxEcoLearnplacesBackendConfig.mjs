/**
 * @type {FluxEcoAppConfig}
 */
export const FluxEcoLearnplacesBackendConfig = {
    endpoints: {
        http: {
            serverConfigId: "HTTP_ENDPOINT_SERVER",
            policyConfigId: "HTTP_ENDPOINT_POLICY",
            actions: {
                getRepositoryTree: {
                    path: '/getRepositoryTree',
                    apiActionId: "getRepositoryTree"
                },
                subscribeToEvent: {
                    eventId: {
                        type: "string",
                        enum: "userLoggedId"
                    },
                    subscriberId: {
                        "type": "string"
                    }
                },
                unsubscribeFromEvent: {
                    eventId: {
                        type: "string",
                        enum: "userLoggedId"
                    },
                    subscriberId: {
                        "type": "string"
                    }
                }
            }
        },
    },
    bindings: {
        iliasDatabase: {
            serverConfigId: "ILIAS_DATABASE_SERVER",
            actions: {
                "getRepositoryTree": {
                    handlerType: "IliasMysqlRepository",
                }
            }
        }
    }
}