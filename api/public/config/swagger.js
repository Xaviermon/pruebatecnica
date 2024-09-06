"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Prueba tecnica',
            version: '1.0.0',
            description: 'API documentation',
            contact: {
                name: 'Xavier Montero Castillo',
                email: 'xavier.mont.0409@gmail.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
const setupSwagger = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
};
exports.setupSwagger = setupSwagger;
