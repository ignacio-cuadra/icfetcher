"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BadRequestException_js_1 = __importDefault(require("./exceptions/BadRequestException.js"));
const ClientException_js_1 = __importDefault(require("./exceptions/ClientException.js"));
const ForbbidenException_js_1 = __importDefault(require("./exceptions/ForbbidenException.js"));
const NotFoundException_js_1 = __importDefault(require("./exceptions/NotFoundException.js"));
const ResponseIsNotJsonException_js_1 = __importDefault(require("./exceptions/ResponseIsNotJsonException.js"));
const ServerException_js_1 = __importDefault(require("./exceptions/ServerException.js"));
const UnauthorizedException_js_1 = __importDefault(require("./exceptions/UnauthorizedException.js"));
const UnprocessableEntityException_js_1 = __importDefault(require("./exceptions/UnprocessableEntityException.js"));
function fetchWrapper(service) {
    return service
        .then((response) => response.text().then((text) => ({ text, status: response.status })))
        .then(({ text, status }) => ({
        text,
        status,
        isSuccess: () => status >= 200 && status < 300,
        isClientException: () => status >= 400 && status < 500,
        isNotFound: () => status === 404,
        isServerException: () => status >= 500 && status < 600,
        isBadRequest: () => status === 400,
        isUnprocessableEntity: () => status === 422,
        isUnauthorized: () => status === 401,
        isForbbiden: () => status === 403,
    }))
        .then((response) => {
        try {
            const data = JSON.parse(response.text);
            return Object.assign({ data }, response);
        }
        catch (e) {
            throw new ResponseIsNotJsonException_js_1.default(Object.assign({ data: null }, response));
        }
    })
        .then((response) => {
        if (response.isForbbiden())
            throw new ForbbidenException_js_1.default(response);
        if (response.isUnauthorized())
            throw new UnauthorizedException_js_1.default(response);
        if (response.isServerException())
            throw new ServerException_js_1.default(response);
        if (response.isBadRequest())
            throw new BadRequestException_js_1.default(response);
        if (response.isUnprocessableEntity())
            throw new UnprocessableEntityException_js_1.default(response);
        if (response.isNotFound())
            throw new NotFoundException_js_1.default(response);
        if (response.isClientException())
            throw new ClientException_js_1.default(response);
        return response;
    });
}
exports.default = fetchWrapper;
//# sourceMappingURL=fetchWrapper.js.map